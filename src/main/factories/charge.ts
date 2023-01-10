import { CreateChargesUseCase } from '../../data/usecases/create-charges/create-charges'
import { BoletoNodeService } from '../../infra/boleto/boleto-node-service'
import { ChargeMongoRepository } from '../../infra/db/mongodb/charge-repository/charge'
import { SendMailAdapter } from '../../infra/mail/send-mail-adapter'
import { CreateChargeBulkController } from '../../presentation/controllers/create-charge-bulk/create-charge-bulk'
import { CpfValidatorAdapter } from '../../utils/cpf-validator-adapter'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'

export const makeCreateChargeBulkController = (): CreateChargeBulkController => {
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const cpfValidatorAdapter = new CpfValidatorAdapter()

  const generateBoleto = new BoletoNodeService()
  const chargeMongoRepository = new ChargeMongoRepository()
  const sendMailAdapter = new SendMailAdapter()
  const createChargeUseCase = new CreateChargesUseCase(generateBoleto, chargeMongoRepository, sendMailAdapter)
  return new CreateChargeBulkController(emailValidatorAdapter, cpfValidatorAdapter, createChargeUseCase)
}
