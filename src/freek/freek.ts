import { join } from 'path'
import express, { Express } from 'express'
import { ControllerRegister } from '../controller-register'
import { ArgumentSourceType } from '../definition'
import { HttpStatus } from '../http-status'
import { Metadata, ControllerHandlerArgumentOptions } from '../metadata'
import { FreekRequest } from '../freek-request'
import { Decorator } from '../decorator'
import { HttpMethod } from '../http-method'

export type FreekConfig = {
  prefix?: string,
  port?: number,
}

const DEFAULT_PORT = 3000
const DEFAULT_PREFIX = '/'

export default class Freek {
  private server: Express | null = null

  private bootstrapped: boolean = false

  constructor (
    private readonly config: FreekConfig,
  ) {}

  // TODO: break this down, too long
  private createRoutes (): void {
    const controllers = ControllerRegister.getControllers()
    const server = this.getServer()

    controllers.forEach(Controller => {
      const metadata = Metadata.getAllForController(Controller)
      const handlers = Metadata.getAllForControllerHandlers(Controller)
      const router = express.Router()
      const controller = new Controller()
      const prefix = join(
        metadata.prefix ?? '/',
        this.getPrefix(),
      )

      server.use(prefix, router)

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

  private createServer (): void {
    this.server = this.server ?? express()
  }

  private getPort (): number {
    return this.config.port ?? DEFAULT_PORT
  }

  private getPrefix (): string {
    return this.config.prefix ?? DEFAULT_PREFIX
  }

  public async bootstrap (): Promise<void> {
    if (this.bootstrapped) {
      throw new Error('Freek.bootstrap() has already been called!')
    }

    this.createServer()
    this.createRoutes()

    return new Promise<void>(resolve => {
      this.getServer().listen(this.getPort(), () => resolve())
    })
  }

  public getServer (): Express {
    if (!this.server) {
      throw new Error('You need to call .bootstrap() first!')
    }

    return this.server
  }
}
