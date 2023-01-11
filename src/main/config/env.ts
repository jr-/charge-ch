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
  }
}
