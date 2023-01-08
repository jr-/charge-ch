import request from 'supertest'
import app from '../config/app'

describe('Charge Routes', () => {
  test('Should return ok on success', async () => {
    await request(app)
      .post('/api/charge/bulk')
      .send({})
      .expect(200)
  })
})
