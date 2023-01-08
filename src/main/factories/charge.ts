import { CreateChargeBulkController } from '../../presentation/controllers/create-charge-bulk/create-charge-bulk'
import { CpfValidatorAdapter } from '../../utils/cpf-validator-adapter'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'

export const makeCreateChargeBulkController = (): CreateChargeBulkController => {
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const cpfValidatorAdapter = new CpfValidatorAdapter()

  return new CreateChargeBulkController(emailValidatorAdapter, cpfValidatorAdapter)
}
