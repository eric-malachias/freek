import express, { Express } from 'express'
import { ControllerRegister } from '../controller-register'
import { HttpMethod } from '../definition'
import { HttpStatus } from '../http-status'
import { Metadata } from '../metadata'

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

      handlers.forEach(handler => {
        const url = handler.url ?? ''
        const method = handler.method ?? HttpMethod.Get
        const status = handler.status ?? HttpStatus.Ok

        router[method](url, (_, res) => {
          try {
            const result = controller[handler.name]()

            res
              .status(status)
              // TODO: optional wrapper structure
              .json(result)
          } catch (err) {
            // TODO: handle this better
            res
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
