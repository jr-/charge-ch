import { Express, Router } from 'express'
import chargeRoutes from '../routes/charge-routes'

export default (app: Express): void => {
  const router = Router()
  app.use('/api', router)
  chargeRoutes(router)
}
