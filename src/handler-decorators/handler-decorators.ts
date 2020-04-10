import { Controller } from '../controller'
import { ControllerHandlerManager } from '../controller-handler-manager'
import { HttpMethod, HttpStatus } from '../definition'

export function Method (method: HttpMethod, url: string) {
  return (target: typeof Controller.prototype, methodName: string) => {
    ControllerHandlerManager
      .getHandler((target as any).constructor, methodName)
      .setMethod(method)
      .setUrl(url)
  }
}

export function Delete (url: string) {
  return Method(HttpMethod.Delete, url)
}

export function Get (url: string) {
  return Method(HttpMethod.Get, url)
}

export function Patch (url: string) {
  return Method(HttpMethod.Patch, url)
}

export function Post (url: string) {
  return Method(HttpMethod.Post, url)
}

export function Put (url: string) {
  return Method(HttpMethod.Put, url)
}

export function Status (status: HttpStatus) {
  return (target: typeof Controller.prototype, methodName: string) => {
    ControllerHandlerManager
      .getHandler((target as any).constructor, methodName)
      .setStatus(status)
  }
}
