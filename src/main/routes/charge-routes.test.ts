import request from 'supertest'
import app from '../config/app'

describe('Charge Routes', () => {
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
