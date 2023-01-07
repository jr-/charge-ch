import { CreateChargeController } from './create-charge'
import { MissingParamError } from '../../error'

const makeSut = (): CreateChargeController => {
  return new CreateChargeController()
}

describe('Create Charge Controller', () => {
  test('Should return 400 if no charges are provided', async () => {
    const sut = makeSut()
    const httpRequest = {
      body: {}
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('charges'))
  })
})
