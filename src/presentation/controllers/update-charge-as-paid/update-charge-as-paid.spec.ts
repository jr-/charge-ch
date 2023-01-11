import { UpdateChargeAsPaidUseCase, UpdateChargeAsPaidModel } from '../../../domain/usecases/update-charge'
import { MissingParamError, ServerError } from '../../errors'
import { UpdateChargeAsPaidController } from './update-charge-as-paid'

const makeUpdateChargeAsPaid = (): UpdateChargeAsPaidUseCase => {
  class UpdateChargeAsPaidStub implements UpdateChargeAsPaidUseCase {
    async update (charge: UpdateChargeAsPaidModel): Promise<void> {
    }
  }
  return new UpdateChargeAsPaidStub()
}

interface SutTypes {
  sut: UpdateChargeAsPaidController
  updateChargeAsPaidStub: UpdateChargeAsPaidUseCase
}

const makeSut = (): SutTypes => {
  const updateChargeAsPaidStub = makeUpdateChargeAsPaid()

  const sut = new UpdateChargeAsPaidController(updateChargeAsPaidStub)
  return {
    sut,
    updateChargeAsPaidStub
  }
}

describe('SignUp Controller', () => {
  test('Should return 400 if no debtId is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        paidAt: 'any_paid_at',
        paidAmount: 'any_paid_amount',
        paidBy: 'any_paid_by'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('debtId'))
  })

  test('Should return 400 if no paidAt is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        debtId: 'any_debt_id',
        paidAmount: 'any_paid_amount',
        paidBy: 'any_paid_by'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('paidAt'))
  })

  test('Should return 400 if no paidAmount is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        debtId: 'any_debt_id',
        paidAt: 'any_paid_at',
        paidBy: 'any_paid_by'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('paidAmount'))
  })

  test('Should return 400 if no paidBy is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        debtId: 'any_debt_id',
        paidAt: 'any_paid_at',
        paidAmount: 'any_paid_amount'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('paidBy'))
  })

  test('Should call UpdateChargeAsPaid with correct values', async () => {
    const { sut, updateChargeAsPaidStub } = makeSut()
    const updateSpy = jest.spyOn(updateChargeAsPaidStub, 'update')
    const httpRequest = {
      body: {
        debtId: 'any_debt_id',
        paidAt: 'any_paid_at',
        paidAmount: 'any_paid_amount',
        paidBy: 'any_paid_by'
      }
    }

    await sut.handle(httpRequest)
    expect(updateSpy).toHaveBeenCalledWith({
      debtId: 'any_debt_id',
      paidAt: 'any_paid_at',
      paidAmount: 'any_paid_amount',
      paidBy: 'any_paid_by'
    })
  })

  test('Should return 500 if UpdateChargeAsPaid throws', async () => {
    const { sut, updateChargeAsPaidStub } = makeSut()
    jest.spyOn(updateChargeAsPaidStub, 'update').mockImplementationOnce(async () => {
      // eslint-disable-next-line @typescript-eslint/return-await
      return new Promise((resolve, reject) => { reject(new Error()) })
    })
    const httpRequest = {
      body: {
        debtId: 'any_debt_id',
        paidAt: 'any_paid_at',
        paidAmount: 'any_paid_amount',
        paidBy: 'any_paid_by'
      }
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        debtId: 'valid_debt_id',
        paidAt: 'valid_paid_at',
        paidAmount: 'valid_paid_amount',
        paidBy: 'valid_paid_by'
      }
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual({})
  })
})
