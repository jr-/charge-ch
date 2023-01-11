import { SendEmailInfo } from '../../../domain/models/email'
import { CreateChargesUseCase } from './create-charges'
import { AddChargeRepository, GenerateBoleto, AddChargeModel, SendEmail, AddChargesModel } from './create-charges-protocols'

const makeGenerateBoleto = (): GenerateBoleto => {
  class GenerateBoletoStub implements GenerateBoleto {
    async generate (charge: AddChargeModel): Promise<string> {
      return await new Promise(resolve => { resolve('html_boleto_string') })
    }
  }
  return new GenerateBoletoStub()
}

const makeAddChargeRepository = (): AddChargeRepository => {
  class AddChargeRepositoryStub implements AddChargeRepository {
    async add (charge: AddChargeModel): Promise<boolean> {
      return await new Promise(resolve => { resolve(true) })
    }
  }
  return new AddChargeRepositoryStub()
}

const makeSendEmail = (): SendEmail => {
  class SendEmailStub implements SendEmail {
    async send (sendEmail: SendEmailInfo): Promise<boolean> {
      return await new Promise(resolve => { resolve(true) })
    }
  }
  return new SendEmailStub()
}

interface SutTypes {
  sut: CreateChargesUseCase
  generateBoletoStub: GenerateBoleto
  addChargeRepositoryStub: AddChargeRepository
  sendEmailStub: SendEmail
}

const makeSut = (): SutTypes => {
  const generateBoletoStub = makeGenerateBoleto()
  const addChargeRepositoryStub = makeAddChargeRepository()
  const sendEmailStub = makeSendEmail()
  const sut = new CreateChargesUseCase(generateBoletoStub, addChargeRepositoryStub, sendEmailStub)

  return {
    sut,
    generateBoletoStub,
    addChargeRepositoryStub,
    sendEmailStub
  }
}

describe('Create Charges Usecase', () => {
  test('Should call GenerateBoleto with the correct chargeModel', async () => {
    const { sut, generateBoletoStub } = makeSut()
    const generateBoletoSpy = jest.spyOn(generateBoletoStub, 'generate')

    const chargeData: AddChargeModel = {
      name: 'valid_name',
      governamentId: 'valid_governament_id',
      email: 'valid_email',
      debtAmount: 'valid_debt_amount',
      debtDueDate: 'valid_debt_due_date',
      debtId: 'valid_debt_id'
    }

    const chargesData: AddChargesModel = {
      charges: [
        chargeData
      ]
    }
    await sut.create(chargesData)
    expect(generateBoletoSpy).toHaveBeenLastCalledWith(chargeData)
  })

  test('Should call AddChargeRepository with the correct chargeModel', async () => {
    const { sut, addChargeRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addChargeRepositoryStub, 'add')

    const chargeData: AddChargeModel = {
      name: 'valid_name',
      governamentId: 'valid_governament_id',
      email: 'valid_email',
      debtAmount: 'valid_debt_amount',
      debtDueDate: 'valid_debt_due_date',
      debtId: 'valid_debt_id'
    }

    const chargesData: AddChargesModel = {
      charges: [
        chargeData
      ]
    }
    await sut.create(chargesData)
    expect(addSpy).toHaveBeenLastCalledWith(chargeData)
  })
})
