import { CreateChargeController } from './create-charge'
import { InvalidParamError, MissingParamError } from '../../error'
import { EmailValidator } from '../../protocols/email-validator'

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

interface SutTypes {
  sut: CreateChargeController
  emailValidatorStub: EmailValidator
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator()
  const sut = new CreateChargeController(emailValidatorStub)

  return {
    sut,
    emailValidatorStub
  }
}

describe('Create Charge Controller', () => {
  test('Should return 400 if no charges are provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {}
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('charges'))
  })

  test('Should return 400 if charges are provided but are empty', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        charges: []
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('charges'))
  })

  test('Should return 400 if no email is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        charges: [
          {
            name: 'any_name',
            governamentId: 'any_governament_id',
            debtAmount: 'any_debt_amount',
            debtDueDate: 'any_date',
            debtId: 'any_id'
          }
        ]
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })

  test('Should return 400 if no name is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        charges: [
          {
            email: 'any_email@mail.com',
            governamentId: 'any_governament_id',
            debtAmount: 'any_debt_amount',
            debtDueDate: 'any_date',
            debtId: 'any_id'
          }
        ]
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('name'))
  })

  test('Should return 400 if no governamentId is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        charges: [
          {
            name: 'any_name',
            email: 'any_email@mail.com',
            debtAmount: 'any_debt_amount',
            debtDueDate: 'any_date',
            debtId: 'any_id'
          }
        ]
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('governamentId'))
  })

  test('Should return 400 if no debtAmount is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        charges: [
          {
            name: 'any_name',
            email: 'any_email@mail.com',
            governamentId: 'any_governament_id',
            debtDueDate: 'any_date',
            debtId: 'any_id'
          }
        ]
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('debtAmount'))
  })

  test('Should return 400 if no debtDueDate is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        charges: [
          {
            name: 'any_name',
            email: 'any_email@mail.com',
            governamentId: 'any_governament_id',
            debtAmount: 'any_debt_amount',
            debtId: 'any_id'
          }
        ]
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('debtDueDate'))
  })

  test('Should return 400 if no debtId is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        charges: [
          {
            name: 'any_name',
            email: 'any_email@mail.com',
            governamentId: 'any_governament_id',
            debtAmount: 'any_debt_amount',
            debtDueDate: 'any_date'
          }
        ]
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('debtId'))
  })

  test('Should return 400 if an invalid email is provided', async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httpRequest = {
      body: {
        charges: [
          {
            name: 'any_name',
            email: 'invalid_email@mail.com',
            governamentId: 'any_governament_id',
            debtAmount: 'any_debt_amount',
            debtDueDate: 'any_date',
            debtId: 'any_id'
          }
        ]
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('email'))
  })

  test('Should call EmailValidator with correct email', async () => {
    const { sut, emailValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
    const httpRequest = {
      body: {
        charges: [
          {
            name: 'any_name',
            email: 'any_email@mail.com',
            governamentId: 'any_governament_id',
            debtAmount: 'any_debt_amount',
            debtDueDate: 'any_date',
            debtId: 'any_id'
          }
        ]
      }
    }
    await sut.handle(httpRequest)
    expect(isValidSpy).toHaveBeenCalledWith('any_email@mail.com')
  })
})
