import { InvalidParamError, MissingParamError } from '../../errors'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { AddChargeModel, CreateCharges } from '../../../domain/usecases/create-charges'
import csvToJson from 'convert-csv-to-json'
import path from 'path'
import { File } from '../../../domain/models/file'

export class CreateChargeBulkController implements Controller {
  private readonly createCharges: CreateCharges

  constructor (createCharges: CreateCharges) {
    this.createCharges = createCharges
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { file } = httpRequest.body as { file: File }
      console.log(file)
      if (!file) {
        return badRequest(new MissingParamError('file'))
      }
      if (file.extension !== 'csv') {
        return badRequest(new InvalidParamError('file'))
      }

      const uploadFolder = path.join(__dirname, '../../../../download/')
      const json = csvToJson.fieldDelimiter(',').getJsonFromCsv(`${uploadFolder}${file.name}`)
      console.log(json)
      if (json.length === 0) {
        return badRequest(new InvalidParamError('file'))
      }

      const charge = json[0]

      const requiredChargeFields = ['name', 'governamentId', 'email', 'debtAmount', 'debtDueDate', 'debtId']

      for (const field of requiredChargeFields) {
        if (!charge[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const chargesData: AddChargeModel[] = json.map((entry: any) => {
        const { name, governamentId, email, debtAmount, debtDueDate, debtId } = entry
        const charge: AddChargeModel = { name, governamentId, email, debtAmount, debtDueDate, debtId }
        return charge
      })

      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      this.createCharges.create({ charges: chargesData })

      return ok({})
    } catch (error) {
      console.log(error)
      return serverError()
    }
  }
}
