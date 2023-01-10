import { AddChargeModel } from '../../domain/usecases/create-charges'

export interface GenerateBoleto {
  generate: (chargeModel: AddChargeModel) => Promise<string>
}
