export enum HttpMethod {
  Delete = 'delete',
  Get = 'get',
  Patch = 'patch',
  Post = 'post',
  Put = 'put',
}

export enum HttpStatus {
  Success = 200,
  Created = 201,
  BadRequest = 400,
  NotFound = 404,
  UnprocessableEntity = 422,
}

export enum MetadataTag {
  ControllerPrefix = 'controller:prefix',
  ControllerHandler = 'controller:handler',
}

export interface IRouter {
  delete (url: string): void
  get (url: string): void
  patch (url: string): void
  post (url: string): void
  put (url: string): void
}
