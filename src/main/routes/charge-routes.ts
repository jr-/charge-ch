import { Router } from 'express'
import { makeCreateChargeBulkController } from '../factories/charge'
import { adaptRoute } from '../adapters/express-route-adapter'

export default (router: Router): void => {
  router.post('/charge/bulk', adaptRoute(makeCreateChargeBulkController()))
}
