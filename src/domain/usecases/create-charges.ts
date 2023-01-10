import { ChargesModel } from '../models/charges'

export interface CreateCharges {
  create: (chargesData: ChargesModel) => Promise<boolean>
}
