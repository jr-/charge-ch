import { CreateChargeController } from './create-charge'
import { MissingParamError } from './error'

describe('Create Charge Controller', () => {
  test('Should return 400 if no charges are provided', () => {
    const sut = new CreateChargeController()
    const httpRequest = {
      body: {}
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('charges'))
  })
})
