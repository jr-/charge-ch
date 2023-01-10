
export interface AddChargeModel {
  name: string
  governamentId: string
  email: string
  debtAmount: string
  debtDueDate: string
  debtId: string
}

export interface AddChargesModel {
  charges: AddChargeModel[]
}

export interface CreateCharges {
  create: (chargesData: AddChargesModel) => Promise<boolean>
}
