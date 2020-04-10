export enum HttpMethod {
  Delete = 'delete',
  Get = 'get',
  Patch = 'patch',
  Post = 'post',
  Put = 'put',
}

// TODO: improve this
export interface IController {
  [key: string]: any
}

export interface IControllerStatic {
  new (...args: any[]): IController
}
