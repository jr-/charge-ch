import { ChargesModel } from '../../domain/models/charges'
import { CreateCharges } from '../../domain/usecases/create-charges'
import { GenerateBoleto } from '../protocols/generate-boleto'

export class CreateChargesUseCase implements CreateCharges {
  private readonly generateBoleto: GenerateBoleto

  constructor (generateBoleto: GenerateBoleto) {
    this.generateBoleto = generateBoleto
  }

  async create (chargesData: ChargesModel): Promise<boolean> {
    await this.generateBoleto.generate(chargesData.charges[0])
    return true
  }
}
