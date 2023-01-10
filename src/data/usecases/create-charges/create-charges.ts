import { AddChargeModel, AddChargeRepository, AddChargesModel, CreateCharges, GenerateBoleto, SendEmail } from './create-charges-protocols'

export class CreateChargesUseCase implements CreateCharges {
  private readonly generateBoleto: GenerateBoleto
  private readonly addChargeRepository: AddChargeRepository
  private readonly sendEmail: SendEmail

  constructor (generateBoleto: GenerateBoleto, addChargeRepository: AddChargeRepository, sendEmail: SendEmail) {
    this.generateBoleto = generateBoleto
    this.addChargeRepository = addChargeRepository
    this.sendEmail = sendEmail
  }

  async create (chargesData: AddChargesModel): Promise<boolean> {
    const { charges } = chargesData
    const chargePromises: Array<Promise<boolean>> = []
    charges.forEach(async charge => {
      chargePromises.push(this.createOne(charge))
    })

    await Promise.all(chargePromises)

    return true
  }

  private async createOne (charge: AddChargeModel): Promise<boolean> {
    const htmlBoleto = await this.generateBoleto.generate(charge)
    await this.sendEmail.send(charge, htmlBoleto)
    await this.addChargeRepository.add(charge)
    return true
  }
}
