import { expect } from 'chai'
import {
  HttpError, BadRequestError,
  UnauthorizedError,
  PaymentRequiredError,
  ForbiddenError,
  NotFoundError,
  MethodNotAllowedError,
  NotAcceptableError,
  ProxyAuthenticationRequiredError,
  RequestTimeoutError,
  ConflictError,
  GoneError,
  LengthRequiredError,
  PreconditionFailedError,
  PayloadTooLargeError,
  UriTooLongError,
  UnsupportedMediaTypeError,
  RangeNotSatisfiableError,
  ExpectationFailedError,
  TeapotError,
  MisdirectedRequestError,
  UnprocessableEntityError,
  LockedError,
  FailedDependencyError,
  TooEarlyError,
  UpgradeRequiredError,
  PreconditionRequiredError,
  TooManyRequestsError,
  RequestHeaderFieldsTooLargeError,
  UnavailableForLegalReasonsError,
  InternalServerErrorError,
  NotImplementedError,
  BadGatewayError,
  ServiceUnavailableError,
  GatewayTimeoutError,
  HTTPVersionNotSupportedError,
  VariantAlsoNegotiatesError,
  InsufficientStorageError,
  LoopDetectedError,
  NotExtendedError,
  NetworkAuthenticationRequiredError,
} from './http-error'
import { HttpStatus } from '../http-status'

const ERROR_CLASSES = [
  BadRequestError,
  UnauthorizedError,
  PaymentRequiredError,
  ForbiddenError,
  NotFoundError,
  MethodNotAllowedError,
  NotAcceptableError,
  ProxyAuthenticationRequiredError,
  RequestTimeoutError,
  ConflictError,
  GoneError,
  LengthRequiredError,
  PreconditionFailedError,
  PayloadTooLargeError,
  UriTooLongError,
  UnsupportedMediaTypeError,
  RangeNotSatisfiableError,
  ExpectationFailedError,
  TeapotError,
  MisdirectedRequestError,
  UnprocessableEntityError,
  LockedError,
  FailedDependencyError,
  TooEarlyError,
  UpgradeRequiredError,
  PreconditionRequiredError,
  TooManyRequestsError,
  RequestHeaderFieldsTooLargeError,
  UnavailableForLegalReasonsError,
  InternalServerErrorError,
  NotImplementedError,
  BadGatewayError,
  ServiceUnavailableError,
  GatewayTimeoutError,
  HTTPVersionNotSupportedError,
  VariantAlsoNegotiatesError,
  InsufficientStorageError,
  LoopDetectedError,
  NotExtendedError,
  NetworkAuthenticationRequiredError,
]

describe('HttpError', () => {
  const internalServerError = new HttpError(HttpStatus.InternalServerError)

  describe('#getDetails', () => {
    it('return the status when details are not provided', () => {
      expect(new HttpError(HttpStatus.BadGateway).getDetails()).to.equal(`${HttpStatus.BadGateway}`)
    })

    it('return the details otherwise', () => {
      expect(
        new HttpError(HttpStatus.BadGateway, 'much details, wow').getDetails(),
      ).to.equal('much details, wow')
    })
  })

  it('#getName', () => {
    expect(internalServerError.getName()).to.equal('HttpError')
  })

  it('#getStatus', () => {
    expect(internalServerError.getStatus()).to.equal(HttpStatus.InternalServerError)
  })

  describe('children classes', () => {
    ERROR_CLASSES.forEach(ErrorClass => {
      const { name } = ErrorClass
      const status = (HttpStatus as any)[name.replace(/Error$/, '')]

      describe(name, () => {
        it('#getName', () => {
          expect(new ErrorClass().getName()).to.equal(ErrorClass.name)
        })

        it('#getStatus', () => {
          expect(new ErrorClass().getStatus()).to.equal(status)
        })
      })
    })
  })
})
