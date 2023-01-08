import { Router } from 'express'

export default (router: Router): void => {
  router.post('/charge/bulk', (req, res) => {
    res.json({ ok: 'ok' })
  })
}
