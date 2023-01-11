export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/kanastra-boleto-charge',
  port: process.env.PORT || 5050,
  email: {
    host: process.env.EMAIL_HOST || 'smtp.ethereal.email',
    port: process.env.EMAIL_PORT || 587
  },
  emailCharge: {
    from: process.env.EMAIL_CHARGE_FROM || '"Fred Foo 👻" <foo@example.com>',
    subject: process.env.EMAIL_CHARGE_SUBJECT || 'Pague sua cobranca',
    text: process.env.EMAIL_CHARGE_TEXT || 'Segue o boleto abaixo para pagamento'
  },
  boletoCharge: {
    chargerInfo: {
      name: process.env.BOLETO_CHARGE_CHARGER_NAME || 'Kanastra',
      cnpj: process.env.BOLETO_CHARGE_CHARGER_CNPJ || '47322759000154',
      bankCode: process.env.BOLETO_CHARGE_CHARGER_BANK_CODE || '001.584-2',
      bankAgency: process.env.BOLETO_CHARGE_CHARGER_BANK_AGENCY || '6119',
      bankName: process.env.BOLETO_CHARGE_CHARGER_BANK_NAME || 'bradesco',
      instructions: process.env.BOLETO_CHARGE_CHARGER_INSTRUCTIONS || 'Não receber após vencimento. \n Multa de 2% após o vencimento. Juros de 0,03% de mora ao dia.'
    }
  }
}
