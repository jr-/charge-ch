export interface FindChargeRepository {
  findByDebtId: (debtId: string) => Promise<boolean>
}
