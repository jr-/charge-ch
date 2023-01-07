import { MissingParamError } from '../../error'
import { HttpRequest, HttpResponse } from '../../protocols'

export class CreateChargeController {
  handle (httpRequest: HttpRequest): HttpResponse {
    return {
      statusCode: 400,
      body: new MissingParamError('charges')
    }
  }
}
