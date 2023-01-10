import { ChargeModel } from '../../domain/models/charge'

export interface GenerateBoleto {
  generate: (chargeModel: ChargeModel) => Promise<string>
}
