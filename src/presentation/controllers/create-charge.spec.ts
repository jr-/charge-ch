import { CreateChargeController } from './create-charge'

describe('Create Charge Controller', () => {
  test('Should return 400 if no charges are provided', () => {
    const sut = new CreateChargeController()
    const httpRequest = {
      body: {}
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
  })
})
