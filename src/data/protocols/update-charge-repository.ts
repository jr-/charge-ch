export interface DbUpdateChargeAsPaid {
  paidInfo: {
    paidAt: string
    paidAmount: string
    paidBy: string
  }
}

export interface UpdateChargeRepository {
  updateToPaid: (toUpdateData: DbUpdateChargeAsPaid, debtId: string) => Promise<boolean>
}
