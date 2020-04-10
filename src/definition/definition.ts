export enum ArgumentSourceType {
  Body = 'body',
  Param = 'param',
  Query = 'query',
  Unknown = 'unknown',
}

// TODO: improve this
export interface IController {
  [key: string]: any
}

export interface IControllerStatic {
  new (...args: any[]): IController
}
