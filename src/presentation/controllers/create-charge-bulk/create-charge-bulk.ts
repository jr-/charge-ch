import { InvalidParamError, MissingParamError } from '../../errors'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { EmailValidator } from '../../protocols/email-validator'
import { CpfValidator } from '../../protocols/cpf-validator'
import { CreateCharges } from '../../../domain/usecases/create-charges'

export class CreateChargeBulkController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly cpfValidator: CpfValidator
  private readonly createCharges: CreateCharges

  constructor (emailValidator: EmailValidator, cpfValidator: CpfValidator, createCharges: CreateCharges) {
    this.emailValidator = emailValidator
    this.cpfValidator = cpfValidator
    this.createCharges = createCharges
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { body } = httpRequest

      if (!body.charges) {
        return badRequest(new MissingParamError('charges'))
      }

      const { charges } = body
      if (charges && Object.keys(charges).length === 0) {
        return badRequest(new InvalidParamError('charges'))
      }

      const requiredChargeFields = ['name', 'governamentId', 'email', 'debtAmount', 'debtDueDate', 'debtId']
      for (const charge of body.charges) {
        for (const field of requiredChargeFields) {
          if (!charge[field]) {
            return badRequest(new MissingParamError(field))
          }
        }
      }

      for (const charge of body.charges) {
        const isValidEmail = this.emailValidator.isValid(charge.email)
        if (!isValidEmail) {
          return badRequest(new InvalidParamError('email'))
        }
        const isValidCpf = this.cpfValidator.isValid(charge.governamentId)
        if (!isValidCpf) {
          return badRequest(new InvalidParamError('governamentId'))
        }
      }

      await this.createCharges.create({ charges: body.charges })

      return ok({})
    } catch (error) {
      console.log(error)
      return serverError()
    }
  }
}
