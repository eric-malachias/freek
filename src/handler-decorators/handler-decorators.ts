import { ArgumentSourceType } from '../definition'
import { HttpStatus } from '../http-status'
import { Metadata } from '../metadata'
import { HttpMethod } from '../http-method'

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

function Argument (type: ArgumentSourceType, name?: string) {
  return (target: any, methodName: string, argumentIndex: number) => {
    Metadata.setForControllerHandlerArgument(
      (target as any).constructor,
      methodName,
      {
        name,
        index: argumentIndex,
        type,
      },
    )
  }
}

export function Body (name?: string) {
  return Argument(ArgumentSourceType.Body, name)
}

export function Param (name?: string) {
  return Argument(ArgumentSourceType.Param, name)
}

export function Query (name?: string) {
  return Argument(ArgumentSourceType.Query, name)
}
