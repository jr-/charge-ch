import { ChargeModel } from '../../domain/models/charge'

export interface AddChargeRepository {
  add: (charge: ChargeModel) => Promise<boolean>
}
