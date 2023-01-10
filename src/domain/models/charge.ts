export interface ChargeModel {
  id: string
  name: string
  governamentId: string
  email: string
  debtAmount: string
  debtDueDate: string
  debtId: string
}

export interface PaidInfo {
  paidAt: string
  paidAmount: string
  paidBy: string
}

export interface PaidChargeModel {
  id: string
  name: string
  governamentId: string
  email: string
  debtAmount: string
  debtDueDate: string
  debtId: string
  status: string
  paidInfo?: PaidInfo
}
