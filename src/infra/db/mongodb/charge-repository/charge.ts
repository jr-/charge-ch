import { AddChargeRepository } from '../../../../data/protocols/add-charge-repository'
import { FindChargeRepository } from '../../../../data/protocols/find-charge-repository'
import { DbUpdateChargeAsPaid, UpdateChargeRepository } from '../../../../data/protocols/update-charge-repository'
import { AddChargeModel } from '../../../../domain/usecases/create-charges'
import { MongoHelper } from '../helpers/mongo-helper'

export class ChargeMongoRepository implements AddChargeRepository, UpdateChargeRepository, FindChargeRepository {
  async add (chargeData: AddChargeModel): Promise<boolean> {
    const chargeCollection = MongoHelper.getCollection('charges')
    const result = await chargeCollection.insertOne({ ...chargeData, status: 'waiting_payment' })
    return result.insertedId !== null
  }

  async findByDebtId (debtId: string): Promise<boolean> {
    const chargeCollection = MongoHelper.getCollection('charges')
    const result = await chargeCollection.findOne({ debtId })
    return result !== null
  }

  async updateToPaid (toUpdateData: DbUpdateChargeAsPaid, debtId: string): Promise<boolean> {
    const chargeCollection = MongoHelper.getCollection('charges')
    const newValues = { $set: toUpdateData }
    const result = await chargeCollection.updateOne({ debtId }, newValues)
    return result !== null
  }
}
