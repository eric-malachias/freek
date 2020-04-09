import { HttpMethod, HttpStatus, IRouter } from '../definition'

type ControllerHandlerData = {
  method: HttpMethod,
  name: string,
  status: HttpStatus,
  url: string,
}

export class ControllerHandler {
  private method: HttpMethod
  private name: string
  private status: HttpStatus
  private url: string

  constructor ({
    method = HttpMethod.Get,
    name = '',
    status = HttpStatus.Success,
    url = '',
  }: Partial<ControllerHandlerData> = {}) {
    this.method = method
    this.name = name
    this.status = status
    this.url = url
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

  public register (router: IRouter, handler: any): void {
    // router.
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
}
