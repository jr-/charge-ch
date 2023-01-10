export interface DbUpdateChargeAsPaid {
  status: string
  paidInfo: {
    paidAt: string
    paidAmount: string
    paidBy: string
  }
}

export interface UpdateChargeRepository {
  updateToPaid: (toUpdateData: DbUpdateChargeAsPaid, debtId: string) => Promise<boolean>
}
