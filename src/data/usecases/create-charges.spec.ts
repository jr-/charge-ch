import { ChargeModel } from '../../domain/models/charge'
import { ChargesModel } from '../../domain/models/charges'
import { GenerateBoleto } from '../protocols/generate-boleto'
import { CreateChargesUseCase } from './create-charges'

interface SutTypes {
  sut: CreateChargesUseCase
  generateBoletoStub: GenerateBoleto
}

const makeSut = (): SutTypes => {
  class GenerateBoletoStub {
    async generate (charge: ChargeModel): Promise<string> {
      return await new Promise(resolve => { resolve('html_boleto_string') })
    }
  }
  const generateBoletoStub = new GenerateBoletoStub()
  const sut = new CreateChargesUseCase(generateBoletoStub)

  return {
    sut,
    generateBoletoStub
  }
}

describe('Create Charges Usecase', () => {
  test('Should call GenerateBoleto with the correct chargeModel', async () => {
    const { sut, generateBoletoStub } = makeSut()
    const generateBoletoSpy = jest.spyOn(generateBoletoStub, 'generate')

    const chargeData: ChargeModel = {
      name: 'valid_name',
      governamentId: 'valid_governament_id',
      email: 'valid_email',
      debtAmount: 'valid_debt_amount',
      debtDueDate: 'valid_debt_due_date',
      debtId: 'valid_debt_id'
    }

    const chargesData: ChargesModel = {
      charges: [
        chargeData
      ]
    }
    await sut.create(chargesData)
    expect(generateBoletoSpy).toHaveBeenLastCalledWith(chargeData)
  })
})
