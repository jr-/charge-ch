import { AddChargeRepository, ChargesModel, CreateCharges, GenerateBoleto, SendEmail } from './create-charges-protocols'

export class CreateChargesUseCase implements CreateCharges {
  private readonly generateBoleto: GenerateBoleto
  private readonly addChargeRepository: AddChargeRepository
  private readonly sendEmail: SendEmail

  constructor (generateBoleto: GenerateBoleto, addChargeRepository: AddChargeRepository, sendEmail: SendEmail) {
    this.generateBoleto = generateBoleto
    this.addChargeRepository = addChargeRepository
    this.sendEmail = sendEmail
  }

  async create (chargesData: ChargesModel): Promise<boolean> {
    await this.generateBoleto.generate(chargesData.charges[0])
    await this.sendEmail.send(chargesData.charges[0])
    await this.addChargeRepository.add(chargesData.charges[0])

    return true
  }
}
