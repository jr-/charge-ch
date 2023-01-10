import { AddChargeRepository } from '../../../../data/protocols/add-charge-repository'
import { AddChargeModel } from '../../../../domain/usecases/create-charges'
import { MongoHelper } from '../helpers/mongo-helper'

export class ChargeMongoRepository implements AddChargeRepository {
  async add (chargeData: AddChargeModel): Promise<boolean> {
    const chargeCollection = MongoHelper.getCollection('charges')
    const result = await chargeCollection.insertOne(chargeData)
    return result.insertedId !== null
  }
}
