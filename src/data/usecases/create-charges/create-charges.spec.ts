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
    async send (charge: AddChargeModel): Promise<boolean> {
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

  test('Should throw if GenerateBoleto throws', async () => {
    const { sut, generateBoletoStub } = makeSut()
    jest.spyOn(generateBoletoStub, 'generate').mockReturnValueOnce(new Promise((resolve, reject) => { reject(new Error()) }))

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
    const promise = sut.create(chargesData)
    await expect(promise).rejects.toThrow()
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

  test('Should throw if AddChargeRepository throws', async () => {
    const { sut, addChargeRepositoryStub } = makeSut()
    jest.spyOn(addChargeRepositoryStub, 'add').mockReturnValueOnce(new Promise((resolve, reject) => { reject(new Error()) }))

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
    const promise = sut.create(chargesData)
    await expect(promise).rejects.toThrow()
  })

  test('Should call SendEmail with the correct chargeModel', async () => {
    const { sut, sendEmailStub } = makeSut()
    const sendSpy = jest.spyOn(sendEmailStub, 'send')

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
    expect(sendSpy).toHaveBeenLastCalledWith(chargeData)
  })

  test('Should throw if SendEmail throws', async () => {
    const { sut, sendEmailStub } = makeSut()
    jest.spyOn(sendEmailStub, 'send').mockReturnValueOnce(new Promise((resolve, reject) => { reject(new Error()) }))

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
    const promise = sut.create(chargesData)
    await expect(promise).rejects.toThrow()
  })
})
