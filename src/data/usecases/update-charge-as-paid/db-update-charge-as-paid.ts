import { UpdateChargeAsPaidUseCase, UpdateChargeAsPaidModel } from '../../../domain/usecases/update-charge'

export class DbUpdateChargeAsPaid implements UpdateChargeAsPaidUseCase {
  async update (charge: UpdateChargeAsPaidModel): Promise<boolean> {
    return true
  }
}
