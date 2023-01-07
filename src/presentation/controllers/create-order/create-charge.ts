import { MissingParamError } from '../error'

export class CreateChargeController {
  handle (httpRequest: any): any {
    return {
      statusCode: 400,
      body: new MissingParamError('charges')
    }
  }
}
