import { ControllerHandler } from '../controller-handler'
import { IRouter } from '../definition'

export class Controller {
  private handlers: ControllerHandler[] = []
  private prefix: string = ''

  public getHandler (name: string): ControllerHandler {
    if (!this.handlers) {
      this.handlers = []
    }

    const handler = this.handlers.find(handler => handler.getName() === name) || null

    if (!handler) {
      this.handlers.push(
        new ControllerHandler({
          name,
        }),
      )

      return this.getHandler(name)
    }

    return handler
  }

  public getPrefix (): string {
    return this.prefix
  }

  public setPrefix (prefix: string): void {
    this.prefix = prefix
  }

  public static register (router: IRouter) {
    const handlers = this.prototype.handlers || []

    handlers.forEach(handler => handler.register(router))
  }
}
