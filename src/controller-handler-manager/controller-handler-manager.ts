import { Controller } from '../controller'
import { HttpMethod, HttpStatus } from '../definition'

type ControllerHandlerManagerData = {
  controller: typeof Controller,
  method?: HttpMethod,
  name?: string,
  status?: HttpStatus,
  url?: string,
}

export class ControllerHandlerManager {
  private readonly controller: typeof Controller
  private method: HttpMethod
  private name: string
  private status: HttpStatus
  private url: string

  private static handlers: ControllerHandlerManager[] = []

  constructor ({
    controller,
    method = HttpMethod.Get,
    name = '',
    status = HttpStatus.Success,
    url = '',
  }: ControllerHandlerManagerData) {
    this.controller = controller
    this.method = method
    this.name = name
    this.status = status
    this.url = url
  }

  public getController (): typeof Controller {
    return this.controller
  }

  public getMethod (): HttpMethod {
    return this.method
  }

  public getName (): string {
    return this.name
  }

  public getStatus (): HttpStatus {
    return this.status
  }

  public getUrl (): string {
    return this.url
  }

  public setMethod (method: HttpMethod): this {
    this.method = method

    return this
  }

  public setName (name: string): this {
    this.name = name

    return this
  }

  public setStatus (status: HttpStatus): this {
    this.status = status

    return this
  }

  public setUrl (url: string): this {
    this.url = url

    return this
  }

  public static getHandler (
    controller: typeof Controller,
    name: string,
  ): ControllerHandlerManager {
    const handler = ControllerHandlerManager.handlers.find(
      handler =>
        handler.getController() === controller && handler.getName() === name,
    )

    if (handler) {
      return handler
    }

    const method = (controller.prototype as any)[name]

    if (typeof method !== 'function') {
      throw new Error(`Controller handler not found: ${controller.name}.${name}`)
    }

    const newHandler = new ControllerHandlerManager({ controller, name })

    ControllerHandlerManager.handlers.push(newHandler)

    return newHandler
  }

  public static getHandlers (): ControllerHandlerManager[] {
    return ControllerHandlerManager.handlers
  }

  public static resetHandlers (): void {
    ControllerHandlerManager.handlers = []
  }
}
