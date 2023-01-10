import { AddChargeModel } from '../../domain/usecases/create-charges'

export interface AddChargeRepository {
  add: (charge: AddChargeModel) => Promise<boolean>
}
