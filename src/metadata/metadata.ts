import { HttpMethod, HttpStatus } from '../definition'

export type ControllerOptions = {
  prefix?: string,
}

export type ControllerHandlerOptions = {
  method?: HttpMethod,
  status?: HttpStatus,
  url?: string,
}

export class Metadata {
  public static getAllForController (controller: any): ControllerOptions {
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
    controller: any,
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

  public static getForController (
    controller: any,
    key: string,
  ): any {
    return Reflect.getMetadata(key, controller)
  }

  public static getForControllerHandler (
    controller: any,
    methodName: string,
    key: keyof ControllerHandlerOptions,
  ): any {
    return Reflect.getMetadata(key, controller, methodName)
  }

  public static setForController (
    controller: any,
    data: ControllerOptions,
  ): void {

    Object
      .entries(data)
      .forEach(([key, value]) => {
        Reflect.defineMetadata(key, value, controller)
      })
  }

  public static setForControllerHandler (
    controller: any,
    methodName: string,
    data: ControllerHandlerOptions,
  ): void {
    Object
      .entries(data)
      .forEach(([key, value]) => {
        Reflect.defineMetadata(key, value, controller, methodName)
      })
  }
}
