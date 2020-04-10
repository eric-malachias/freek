import { Request, Response, NextFunction } from 'express'

export type FreekRequestData = {
  request: Request,
  response: Response,
  next: NextFunction,
}

export class FreekRequest {
  constructor (
    private readonly data: FreekRequestData,
  ) {}

  public getNext (): NextFunction {
    return this.data.next
  }

  public getRequest (): Request {
    return this.data.request
  }

  public getResponse (): Response {
    return this.data.response
  }
}
