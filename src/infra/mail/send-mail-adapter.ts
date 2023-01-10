import * as nodemailer from 'nodemailer'
import { SendEmail } from '../../data/protocols/send-email'
import { AddChargeModel } from '../../domain/usecases/create-charges'

export class SendMailAdapter implements SendEmail {
  async send (chargeModel: AddChargeModel, boletoHtml: string): Promise<boolean> {
    const testAccount = await nodemailer.createTestAccount()

    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass
      }
    })

    const info = await transporter.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>',
      to: 'joseluis.ruas@gmail.com',
      subject: 'Pague sua cobranca',
      text: 'Pague',
      html: boletoHtml
    })

    console.log('Message sent: %s', info.messageId)

    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))

    return true
  }
}
