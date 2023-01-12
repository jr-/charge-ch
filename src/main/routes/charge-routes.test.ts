import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'

describe('Charge Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const chargeCollection = MongoHelper.getCollection('charge')
    await chargeCollection.deleteMany({})
  })

  test('Should return ok on success', async () => {
    await request(app)
      .post('/api/charge/bulk')
      .send({
        charges: [
          {
            name: 'agua',
            governamentId: '15906606092',
            email: 'joseluis.ruas@gmail.com',
            debtAmount: '1000.00',
            debtDueDate: '2023-01-20',
            debtId: '8291'
          }
        ]
      })
      .expect(200)
  })
})
