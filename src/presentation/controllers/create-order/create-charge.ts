import { MissingParamError } from '../../error'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'

export class CreateChargeController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    return {
      statusCode: 400,
      body: new MissingParamError('charges')
    }
  }
}
