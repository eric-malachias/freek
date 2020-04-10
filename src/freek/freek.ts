import express, { Express } from 'express'
import { ControllerRegister } from '../controller-register'
import { HttpMethod, ArgumentSourceType } from '../definition'
import { HttpStatus } from '../http-status'
import { Metadata, ControllerHandlerArgumentOptions } from '../metadata'
import { FreekRequest } from '../freek-request'
import { Decorator } from '../decorator'

export type FreekConfig = {
  port?: number,
}

const DEFAULT_PORT = 3000

export class Freek {
  private static bootstrapped: boolean = false

  private static createRoutes (app: Express): void {
    const controllers = ControllerRegister.getControllers()

    controllers.forEach(Controller => {
      const metadata = Metadata.getAllForController(Controller)
      const handlers = Metadata.getAllForControllerHandlers(Controller)
      const router = express.Router()
      const controller = new Controller()

      app.use(metadata.prefix ?? '/', router)

      handlers.forEach(handlerMetadata => {
        const url = handlerMetadata.url ?? ''
        const method = handlerMetadata.method ?? HttpMethod.Get
        const status = handlerMetadata.status ?? HttpStatus.Ok
        const handler = controller[handlerMetadata.name]
        const options = handlerMetadata.arguments ?? new Array(handler.length)
          .fill(null)
          .map((_, index): ControllerHandlerArgumentOptions => ({
            index,
            type: ArgumentSourceType.Unknown,
          }))

        router[method](url, (request, response, next) => {
          try {
            const freekRequest = new FreekRequest({
              request,
              response,
              next,
            })
            const argumentValues = Decorator.getArguments(
              options,
              freekRequest,
            )
            const result = handler.apply(controller, argumentValues)

            response
              .status(status)
              // TODO: #next optional wrapper structure
              .json(result)
          } catch (err) {
            // TODO: handle this better
            response
              .status(HttpStatus.InternalServerError)
              .json(null)
          }
        })
      })
    })
  }

  public static async bootstrap (config: FreekConfig): Promise<void> {
    if (this.bootstrapped) {
      throw new Error('Freek.bootstrap() has already been called!')
    }

    const port = config.port ?? DEFAULT_PORT
    const app = express()

    Freek.createRoutes(app)

    return new Promise<void>(resolve => {
      app.listen(port, () => resolve())
    })
  }
}
