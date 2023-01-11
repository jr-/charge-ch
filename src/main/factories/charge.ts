import { CreateChargesUseCase } from '../../data/usecases/create-charges/create-charges'
import { DbUpdateChargeAsPaid } from '../../data/usecases/update-charge-as-paid/db-update-charge-as-paid'
import { BoletoNodeService } from '../../infra/boleto/boleto-node-service'
import { ChargeMongoRepository } from '../../infra/db/mongodb/charge-repository/charge'
import { SendMailAdapter } from '../../infra/mail/send-mail-adapter'
import { CreateChargeBulkController } from '../../presentation/controllers/create-charge-bulk/create-charge-bulk'
import { UpdateChargeAsPaidController } from '../../presentation/controllers/update-charge-as-paid/update-charge-as-paid'

export const makeCreateChargeBulkController = (): CreateChargeBulkController => {
  const generateBoleto = new BoletoNodeService()
  const chargeMongoRepository = new ChargeMongoRepository()
  const sendMailAdapter = new SendMailAdapter()
  const createChargeUseCase = new CreateChargesUseCase(generateBoleto, chargeMongoRepository, sendMailAdapter)
  return new CreateChargeBulkController(createChargeUseCase)
}

export const makeUpdateChargeAsPaidController = (): UpdateChargeAsPaidController => {
  const chargeMongoRepository = new ChargeMongoRepository()
  const dbUpdateChargeAsPaid = new DbUpdateChargeAsPaid(chargeMongoRepository, chargeMongoRepository)
  return new UpdateChargeAsPaidController(dbUpdateChargeAsPaid)
}
