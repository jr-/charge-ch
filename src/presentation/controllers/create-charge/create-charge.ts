import { InvalidParamError, MissingParamError } from '../../error'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { badRequest, ok } from '../../helper/http-helper'

export class CreateChargeController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
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

    return ok({})
  }
}
