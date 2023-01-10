import { MongoHelper } from '../helpers/mongo-helper'
import { ChargeMongoRepository } from './charge'

describe('Charge Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const chargeCollection = MongoHelper.getCollection('charge')
    await chargeCollection.deleteMany({})
  })

  const makeSut = (): ChargeMongoRepository => {
    return new ChargeMongoRepository()
  }
  test('Should return true on success', async () => {
    const sut = makeSut()
    const isValid = await sut.add({
      name: 'any_name',
      governamentId: 'any_governament_id',
      email: 'any_email@mail.com',
      debtAmount: 'any_debt_amount',
      debtDueDate: 'any_debt_due_date',
      debtId: 'any_debt_id'
    })
    expect(isValid).toBe(true)
  })
})
