import { ControllerHandlerArgumentOptions } from '../metadata'
import { ArgumentSourceType } from '../definition'
import { FreekRequest } from '../freek-request'

export class Decorator {
  private static getArgument (
    options: ControllerHandlerArgumentOptions,
    request: FreekRequest,
  ): any {
    if (options.type === ArgumentSourceType.Unknown) {
      // TODO: run this validation before the code is actually running
      throw new Error('Unknown source for controller handler argument.')
    }

    const expressRequest = request.getRequest()

    switch (options.type) {
      case ArgumentSourceType.Body:
        return options.name === undefined
          ? expressRequest.body
          : expressRequest.body[options.name] ?? null
      case ArgumentSourceType.Param:
        return options.name === undefined
          ? expressRequest.params
          : expressRequest.params[options.name] ?? null
      case ArgumentSourceType.Query:
        return options.name === undefined
          ? expressRequest.query
          : expressRequest.query[options.name] ?? null
    }
  }

  public static getArguments (
    options: ControllerHandlerArgumentOptions[],
    request: FreekRequest,
  ): any[] {
    return options.map(options => Decorator.getArgument(options, request))
  }
}
