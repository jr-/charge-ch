import { InvalidParamError, MissingParamError } from '../../error'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { badRequest, ok } from '../../helper/http-helper'

export class CreateChargeController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { body } = httpRequest

    const requiredFields = ['charges']
    for (const field of requiredFields) {
      if (!body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }

    const { charges } = body
    if (charges && Object.keys(charges).length === 0) {
      return badRequest(new InvalidParamError('charges'))
    }

    return ok({})
  }
}
