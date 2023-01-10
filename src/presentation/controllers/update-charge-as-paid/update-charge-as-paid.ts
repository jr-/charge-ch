import { MissingParamError } from '../../errors'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { UpdateChargeAsPaidUseCase } from '../../../domain/usecases/update-charge'

export class UpdateChargeAsPaidController implements Controller {
  private readonly updateChargeAsPaid: UpdateChargeAsPaidUseCase
  constructor (updateChargeAsPaid: UpdateChargeAsPaidUseCase) {
    this.updateChargeAsPaid = updateChargeAsPaid
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { body } = httpRequest

      const requiredFields = ['debtId', 'paidAt', 'paidAmount', 'paidBy']
      for (const field of requiredFields) {
        if (!body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { debtId, paidAt, paidAmount, paidBy } = body
      await this.updateChargeAsPaid.update({
        debtId,
        paidAt,
        paidAmount,
        paidBy
      })
      return ok({})
    } catch (error) {
      console.log(error)
      return serverError()
    }
  }
}
