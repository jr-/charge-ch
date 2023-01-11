export interface UpdateChargeAsPaidModel {
  debtId: string
  paidAt: string
  paidAmount: string
  paidBy: string
}

export interface UpdateChargeAsPaidUseCase {
  update: (charge: UpdateChargeAsPaidModel) => Promise<void>
}
