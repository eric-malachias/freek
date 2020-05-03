import { HttpStatus } from '../http-status'

export class HttpError extends Error {
  constructor (
    private readonly status: HttpStatus,
    private readonly details?: string,
  ) {
    super()
  }

  public getDetails (): string {
    return this.details ?? `${this.status}`
  }

  public getName (): string {
    return this.constructor.name
  }

  public getStatus (): HttpStatus {
    return this.status
  }

  // NOTE: `Error` class compatibility
  public get name (): string {
    return this.getName()
  }

  public get message (): string {
    return this.getDetails()
  }
}

export class BadRequestError extends HttpError {
  constructor (details?: string) {
    super(HttpStatus.BadRequest, details)
  }
}

export class UnauthorizedError extends HttpError {
  constructor (details?: string) {
    super(HttpStatus.Unauthorized, details)
  }
}

export class PaymentRequiredError extends HttpError {
  constructor (details?: string) {
    super(HttpStatus.PaymentRequired, details)
  }
}

export class ForbiddenError extends HttpError {
  constructor (details?: string) {
    super(HttpStatus.Forbidden, details)
  }
}

export class NotFoundError extends HttpError {
  constructor (details?: string) {
    super(HttpStatus.NotFound, details)
  }
}

export class MethodNotAllowedError extends HttpError {
  constructor (details?: string) {
    super(HttpStatus.MethodNotAllowed, details)
  }
}

export class NotAcceptableError extends HttpError {
  constructor (details?: string) {
    super(HttpStatus.NotAcceptable, details)
  }
}

export class ProxyAuthenticationRequiredError extends HttpError {
  constructor (details?: string) {
    super(HttpStatus.ProxyAuthenticationRequired, details)
  }
}

export class RequestTimeoutError extends HttpError {
  constructor (details?: string) {
    super(HttpStatus.RequestTimeout, details)
  }
}

export class ConflictError extends HttpError {
  constructor (details?: string) {
    super(HttpStatus.Conflict, details)
  }
}

export class GoneError extends HttpError {
  constructor (details?: string) {
    super(HttpStatus.Gone, details)
  }
}

export class LengthRequiredError extends HttpError {
  constructor (details?: string) {
    super(HttpStatus.LengthRequired, details)
  }
}

export class PreconditionFailedError extends HttpError {
  constructor (details?: string) {
    super(HttpStatus.PreconditionFailed, details)
  }
}

export class PayloadTooLargeError extends HttpError {
  constructor (details?: string) {
    super(HttpStatus.PayloadTooLarge, details)
  }
}

export class UriTooLongError extends HttpError {
  constructor (details?: string) {
    super(HttpStatus.UriTooLong, details)
  }
}

export class UnsupportedMediaTypeError extends HttpError {
  constructor (details?: string) {
    super(HttpStatus.UnsupportedMediaType, details)
  }
}

export class RangeNotSatisfiableError extends HttpError {
  constructor (details?: string) {
    super(HttpStatus.RangeNotSatisfiable, details)
  }
}

export class ExpectationFailedError extends HttpError {
  constructor (details?: string) {
    super(HttpStatus.ExpectationFailed, details)
  }
}

export class TeapotError extends HttpError {
  constructor (details?: string) {
    super(HttpStatus.Teapot, details)
  }
}

export class MisdirectedRequestError extends HttpError {
  constructor (details?: string) {
    super(HttpStatus.MisdirectedRequest, details)
  }
}

export class UnprocessableEntityError extends HttpError {
  constructor (details?: string) {
    super(HttpStatus.UnprocessableEntity, details)
  }
}

export class LockedError extends HttpError {
  constructor (details?: string) {
    super(HttpStatus.Locked, details)
  }
}

export class FailedDependencyError extends HttpError {
  constructor (details?: string) {
    super(HttpStatus.FailedDependency, details)
  }
}

export class TooEarlyError extends HttpError {
  constructor (details?: string) {
    super(HttpStatus.TooEarly, details)
  }
}

export class UpgradeRequiredError extends HttpError {
  constructor (details?: string) {
    super(HttpStatus.UpgradeRequired, details)
  }
}

export class PreconditionRequiredError extends HttpError {
  constructor (details?: string) {
    super(HttpStatus.PreconditionRequired, details)
  }
}

export class TooManyRequestsError extends HttpError {
  constructor (details?: string) {
    super(HttpStatus.TooManyRequests, details)
  }
}

export class RequestHeaderFieldsTooLargeError extends HttpError {
  constructor (details?: string) {
    super(HttpStatus.RequestHeaderFieldsTooLarge, details)
  }
}

export class UnavailableForLegalReasonsError extends HttpError {
  constructor (details?: string) {
    super(HttpStatus.UnavailableForLegalReasons, details)
  }
}

export class InternalServerErrorError extends HttpError {
  constructor (details?: string) {
    super(HttpStatus.InternalServerError, details)
  }
}

export class NotImplementedError extends HttpError {
  constructor (details?: string) {
    super(HttpStatus.NotImplemented, details)
  }
}

export class BadGatewayError extends HttpError {
  constructor (details?: string) {
    super(HttpStatus.BadGateway, details)
  }
}

export class ServiceUnavailableError extends HttpError {
  constructor (details?: string) {
    super(HttpStatus.ServiceUnavailable, details)
  }
}

export class GatewayTimeoutError extends HttpError {
  constructor (details?: string) {
    super(HttpStatus.GatewayTimeout, details)
  }
}

export class HTTPVersionNotSupportedError extends HttpError {
  constructor (details?: string) {
    super(HttpStatus.HTTPVersionNotSupported, details)
  }
}

export class VariantAlsoNegotiatesError extends HttpError {
  constructor (details?: string) {
    super(HttpStatus.VariantAlsoNegotiates, details)
  }
}

export class InsufficientStorageError extends HttpError {
  constructor (details?: string) {
    super(HttpStatus.InsufficientStorage, details)
  }
}

export class LoopDetectedError extends HttpError {
  constructor (details?: string) {
    super(HttpStatus.LoopDetected, details)
  }
}

export class NotExtendedError extends HttpError {
  constructor (details?: string) {
    super(HttpStatus.NotExtended, details)
  }
}

export class NetworkAuthenticationRequiredError extends HttpError {
  constructor (details?: string) {
    super(HttpStatus.NetworkAuthenticationRequired, details)
  }
}
