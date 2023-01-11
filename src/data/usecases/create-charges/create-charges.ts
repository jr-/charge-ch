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
    const chargePromises: Array<Promise<void>> = []
    charges.forEach(async charge => {
      chargePromises.push(this.createOne(charge))
    })

    await Promise.allSettled(chargePromises)
  }

  private async createOne (charge: AddChargeModel): Promise<void> {
    try {
      const htmlBoleto = await this.generateBoleto.generate(charge)
      if (!htmlBoleto) {
        console.info(`Boleto nao gerado para ${charge.debtId}`)
        return
      }
      const sendEmailInfo: SendEmailInfo = {
        from: env.emailCharge.from,
        to: charge.email,
        subject: env.emailCharge.subject,
        text: env.emailCharge.text,
        html: htmlBoleto
      }
      const result = await this.sendEmail.send(sendEmailInfo)
      if (!result) {
        console.info(`Email nao enviado para ${charge.debtId}`)
        return
      }
      await this.addChargeRepository.add(charge)
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      console.error(`${error.message} ${charge.debtId}`)
    }
  }
}
