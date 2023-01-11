import { SendEmailInfo } from '../../../domain/models/email'
import { AddChargeModel, AddChargeRepository, AddChargesModel, CreateCharges, GenerateBoleto, SendEmail } from './create-charges-protocols'
import env from '../../../main/config/env'

export class CreateChargesUseCase implements CreateCharges {
  private readonly generateBoleto: GenerateBoleto
  private readonly addChargeRepository: AddChargeRepository
  private readonly sendEmail: SendEmail

  constructor (generateBoleto: GenerateBoleto, addChargeRepository: AddChargeRepository, sendEmail: SendEmail) {
    this.generateBoleto = generateBoleto
    this.addChargeRepository = addChargeRepository
    this.sendEmail = sendEmail
  }

  async create (chargesData: AddChargesModel): Promise<void> {
    const { charges } = chargesData
    const chargePromises: Array<Promise<boolean>> = []
    charges.forEach(async charge => {
      chargePromises.push(this.createOne(charge))
    })

    await Promise.all(chargePromises)
  }

  private async createOne (charge: AddChargeModel): Promise<boolean> {
    const htmlBoleto = await this.generateBoleto.generate(charge)
    const sendEmailInfo: SendEmailInfo = {
      from: env.emailCharge.from,
      to: charge.email,
      subject: env.emailCharge.subject,
      text: env.emailCharge.text,
      html: htmlBoleto
    }
    await this.sendEmail.send(sendEmailInfo)
    await this.addChargeRepository.add(charge)
    return true
  }
}
