import { IControllerStatic, ArgumentSourceType } from '../definition'
import { HttpStatus } from '../http-status'
import { HttpMethod } from '../http-method'

export type ControllerOptions = {
  prefix?: string,
}

export type ControllerHandlerOptions = {
  arguments?: ControllerHandlerArgumentOptions[],
  method?: HttpMethod,
  status?: HttpStatus,
  url?: string,
}

export type ControllerHandlerArgumentOptions = {
  index: number,
  name?: string,
  type: ArgumentSourceType.Body | ArgumentSourceType.Param | ArgumentSourceType.Query,
} | {
  index: number,
  type: ArgumentSourceType.Unknown,
}

export class Metadata {
  public static getAllForController (controller: IControllerStatic): ControllerOptions {
    const keys = Reflect.getMetadataKeys(controller) as (keyof ControllerOptions)[]

    return keys.reduce(
      (total, key) => ({
        ...total,
        [key]: Metadata.getForController(controller, key),
      }),
      {},
    )
  }

  public static getAllForControllerHandlers (
    controller: IControllerStatic,
  ): (ControllerHandlerOptions & { name: string })[] {
    return Object
      .getOwnPropertyNames(controller.prototype)
      .map(name => ([
        name,
        Reflect.getMetadataKeys(controller, name)] as [string, (keyof ControllerHandlerOptions)[],
      ]))
      .filter(([, keys]) => keys.length > 0)
      .map(([name, keys]) => ({
        name,
        ...keys.reduce(
          (total, key) => ({
            ...total,
            [key]: Metadata.getForControllerHandler(controller, name, key),
          }),
          {},
        ),
      }))
  }

  public static getForController<T extends keyof ControllerOptions> (
    controller: IControllerStatic,
    key: T,
  ): ControllerOptions[T] {
    return Reflect.getMetadata(key, controller)
  }

  public static getForControllerHandler<T extends keyof ControllerHandlerOptions> (
    controller: IControllerStatic,
    methodName: string,
    key: T,
  ): ControllerHandlerOptions[T] {
    return Reflect.getMetadata(key, controller, methodName)
  }

  public static setForController (
    controller: IControllerStatic,
    data: ControllerOptions,
  ): void {
    Object
      .entries(data)
      .forEach(([key, value]) => {
        Reflect.defineMetadata(key, value, controller)
      })
  }

  public static setForControllerHandler (
    controller: IControllerStatic,
    methodName: string,
    data: ControllerHandlerOptions,
  ): void {
    Object
      .entries(data)
      .forEach(([key, value]) => {
        Reflect.defineMetadata(key, value, controller, methodName)
      })
  }

  public static setForControllerHandlerArgument (
    controller: IControllerStatic,
    methodName: string,
    data: ControllerHandlerArgumentOptions,
  ): void {
    const args: ControllerHandlerArgumentOptions[] = Metadata.getForControllerHandler(
      controller,
      methodName,
      'arguments',
    ) ?? new Array(controller.prototype[methodName].length)
      .fill(null)
      .map((_, index) => ({
        index,
        type: ArgumentSourceType.Unknown,
      }))

    args[data.index] = data

    this.setForControllerHandler(
      controller,
      methodName,
      {
        arguments: args,
      },
    )
  }
}
