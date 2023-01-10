import { AddChargeModel } from '../../domain/usecases/create-charges'
import parseISO from 'date-fns/parseISO'
import { GenerateBoleto } from '../../data/protocols/generate-boleto'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Boleto = require('boleto-node').Boleto

export class BoletoNodeService implements GenerateBoleto {
  async generate (chargeInfo: AddChargeModel): Promise<string> {
    const debtAmount = chargeInfo.debtAmount.replace(/\./g, '')

    const boleto = new Boleto({
      banco: 'bradesco',
      data_emissao: new Date(),
      data_vencimento: parseISO(chargeInfo.debtDueDate),
      valor: debtAmount,
      nosso_numero: '1234567',
      numero_documento: '123123',
      instrucoes: 'Não receber após vencimento. \n Multa de 2% após o vencimento. Juros de 0,03% de mora ao dia.', // separar cada linha por \n
      pagador: 'TESTE DA SILVA',
      pagador_cpf_cnpj: '288.664.364-53',
      pagador_endereco_rua_num: 'RUA SÃO CARLOS AUGUSTINO DA SILVA, 50',
      pagador_endereco_bairro: 'SÃO JOÃO BATISTA DA SILVA',
      pagador_endereco_cep: '15.160-100',
      pagador_endereco_cidade_estado: 'SÃO JOSÉ DOS TESTES - SP',
      pagador_outras_informacoes: 'Login da central: testeteste',
      cedente: 'PAGAMENTOS LTDA',
      cedente_cnpj: '47322759000154',
      cedente_endereco_rua_num: 'RUA CEL. JONAS DOS SANTOS, 130',
      cedente_endereco_bairro: 'CENTRO',
      cedente_endereco_cep: '15.115-100',
      cedente_endereco_cidade_estado: 'SÃO JOSÉ DOS TESTES - SP',
      agencia: '6119',
      codigo_cedente: '001.584-2',
      carteira: '09'
    })

    let boletoHtml
    boleto.renderHTML('boleto', true, function (html) {
      boletoHtml = html
    })

    return boletoHtml
  }
}
