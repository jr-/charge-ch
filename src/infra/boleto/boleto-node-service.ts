import { AddChargeModel } from '../../domain/usecases/create-charges'
import parseISO from 'date-fns/parseISO'
import { GenerateBoleto } from '../../data/protocols/generate-boleto'
import env from '../../main/config/env'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Boleto = require('boleto-node').Boleto

export class BoletoNodeService implements GenerateBoleto {
  async generate (chargeInfo: AddChargeModel): Promise<string> {
    try {
      const debtAmount = chargeInfo.debtAmount.replace(/\./g, '')

      const boleto = new Boleto({
        banco: env.boletoCharge.chargerInfo.bankName,
        data_emissao: new Date(),
        data_vencimento: parseISO(chargeInfo.debtDueDate),
        valor: debtAmount,
        nosso_numero: '1234567',
        numero_documento: '123123',
        instrucoes: env.boletoCharge.chargerInfo.instructions,
        pagador: chargeInfo.name,
        pagador_cpf_cnpj: chargeInfo.governamentId,
        cedente: env.boletoCharge.chargerInfo.name,
        cedente_cnpj: env.boletoCharge.chargerInfo.cnpj,
        agencia: env.boletoCharge.chargerInfo.bankAgency,
        codigo_cedente: env.boletoCharge.chargerInfo.bankCode,
        carteira: '09'
      })

      let boletoHtml
      boleto.renderHTML('boleto', true, function (html: any) {
        boletoHtml = html
      })
      return boletoHtml as unknown as string
    } catch (error: any) {
      console.error(error.message, error.name)
      throw new Error('Erro ao gerar boleto')
    }
  }
}
