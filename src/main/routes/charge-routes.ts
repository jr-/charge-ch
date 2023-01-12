import { Router } from 'express'
import { makeCreateChargeBulkController, makeUpdateChargeAsPaidController } from '../factories/charge'
import { adaptRoute } from '../adapters/express-route-adapter'
import { fileHandler } from '../middlewares/file-handler'
import multer from 'multer'
import path from 'path'
const uploadFolder = path.join(__dirname, '../../../download')
console.log(uploadFolder)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadFolder)
  },
  filename: function (req, file, cb) {
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage })
console.log(upload)

export default (router: Router): void => {
  router.post(
    '/charge/bulk',
    upload.single('file'),
    fileHandler,
    adaptRoute(makeCreateChargeBulkController()))
  router.post(
    '/charge/updateAsPaid',
    adaptRoute(makeUpdateChargeAsPaidController())

  )
}
