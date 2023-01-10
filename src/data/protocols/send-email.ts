import { ChargeModel } from '../../domain/models/charge'

export interface SendEmail {
  send: (chargeModel: ChargeModel) => Promise<boolean>
}
