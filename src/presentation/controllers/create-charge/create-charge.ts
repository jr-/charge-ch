import { InvalidParamError, MissingParamError } from '../../error'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { badRequest, ok, serverError } from '../../helper/http-helper'
import { EmailValidator } from '../../protocols/email-validator'

export class CreateChargeController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { body } = httpRequest

      if (!body.charges) {
        return badRequest(new MissingParamError('charges'))
      }

      const { charges } = body
      if (charges && Object.keys(charges).length === 0) {
        return badRequest(new InvalidParamError('charges'))
      }

      const requiredChargeFields = ['name', 'governamentId', 'email', 'debtAmount', 'debtDueDate', 'debtId']
      for (const charge of body.charges) {
        for (const field of requiredChargeFields) {
          if (!charge[field]) {
            return badRequest(new MissingParamError(field))
          }
        }
      }

      for (const charge of body.charges) {
        const isValid = this.emailValidator.isValid(charge.email)
        if (!isValid) {
          return badRequest(new InvalidParamError('email'))
        }
      }

      return ok({})
    } catch (error) {
      return serverError()
    }
  }
}
