import { HttpMethod, HttpStatus } from '../definition'
import { Metadata } from '../metadata'

export function Method (method: HttpMethod, url: string) {
  return (target: any, methodName: string) => {
    Metadata.setForControllerHandler(
      (target as any).constructor,
      methodName,
      { method, url },
    )
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
  return (target: any, methodName: string) => {
    Metadata.setForControllerHandler(
      (target as any).constructor,
      methodName,
      { status },
    )
  }
}
