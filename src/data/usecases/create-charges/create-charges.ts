import { AddChargeRepository, ChargesModel, CreateCharges, GenerateBoleto } from './create-charges-protocols'

export class CreateChargesUseCase implements CreateCharges {
  private readonly generateBoleto: GenerateBoleto
  private readonly addChargeRepository: AddChargeRepository

  constructor (generateBoleto: GenerateBoleto, addChargeRepository: AddChargeRepository) {
    this.generateBoleto = generateBoleto
    this.addChargeRepository = addChargeRepository
  }

  async create (chargesData: ChargesModel): Promise<boolean> {
    await this.generateBoleto.generate(chargesData.charges[0])
    await this.addChargeRepository.add(chargesData.charges[0])
    return true
  }
}
