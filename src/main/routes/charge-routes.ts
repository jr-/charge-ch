import { Router } from 'express'
import { makeCreateChargeBulkController, makeUpdateChargeAsPaidController } from '../factories/charge'
import { adaptRoute } from '../adapters/express-route-adapter'

export default (router: Router): void => {
  router.post('/charge/bulk', adaptRoute(makeCreateChargeBulkController()))
  router.post('/charge/updateAsPaid', adaptRoute(makeUpdateChargeAsPaidController()))
}
