import * as nodemailer from 'nodemailer'
import { SendEmail } from '../../data/protocols/send-email'
import { SendEmailInfo } from '../../domain/models/email'
import env from '../../main/config/env'

export class SendMailAdapter implements SendEmail {
  async send (sendEmailInfo: SendEmailInfo): Promise<boolean> {
    try {
      const testAccount = await nodemailer.createTestAccount()

      const transporter = nodemailer.createTransport({
        host: env.email.host,
        port: env.email.port as number,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass
        }
      })

      const info = await transporter.sendMail({
        from: sendEmailInfo.from,
        to: sendEmailInfo.to,
        subject: sendEmailInfo.subject,
        text: sendEmailInfo.text,
        html: sendEmailInfo.html
      })

      console.log('Message sent: %s', info.messageId)

      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))

      return info.messageId !== null
    } catch (error: any) {
      console.error(error.message, error.name)
      throw new Error('Erro ao enviar email')
    }
  }
}
