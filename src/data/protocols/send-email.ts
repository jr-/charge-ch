import { AddChargeModel } from '../../domain/usecases/create-charges'

export interface SendEmail {
  send: (chargeModel: AddChargeModel, boletoHtml: string) => Promise<boolean>
}
