import { UpdateChargeAsPaidUseCase, UpdateChargeAsPaidModel } from '../../../domain/usecases/update-charge'
import { FindChargeRepository } from '../../protocols/find-charge-repository'
import { UpdateChargeRepository } from '../../protocols/update-charge-repository'

export class DbUpdateChargeAsPaid implements UpdateChargeAsPaidUseCase {
  private readonly findChargeRepository: FindChargeRepository
  private readonly updateChargeRepository: UpdateChargeRepository

  constructor (findChargeRepository: FindChargeRepository, updateChargeRepository: UpdateChargeRepository) {
    this.findChargeRepository = findChargeRepository
    this.updateChargeRepository = updateChargeRepository
  }

  async update (charge: UpdateChargeAsPaidModel): Promise<boolean> {
    const { debtId, paidAt, paidAmount, paidBy } = charge
    const found = await this.findChargeRepository.findByDebtId(debtId)
    if (found) {
      await this.updateChargeRepository.updateToPaid({ paidInfo: { paidAt, paidAmount, paidBy }, status: 'paid' }, debtId)
    }
    return true
  }
}
