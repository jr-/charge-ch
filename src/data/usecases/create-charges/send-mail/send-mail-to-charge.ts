import { ChargeModel } from '../../../../domain/models/charge'
import { EmailOptions, EmailService } from '../../../../infra/mail/nodemailer-email-service'
import { SendEmail } from '../create-charges-protocols'

export class SendEmailToCharge implements SendEmail {
  private readonly mailService: EmailService
  private readonly mailOptions: EmailOptions
  constructor (mailOptions: EmailOptions, mailService: EmailService) {
    this.mailOptions = mailOptions
    this.mailService = mailService
  }

  async send (chargeData: ChargeModel): Promise<boolean> {
    const customizedHtml = '<p> Pague a sua cobranca </p>'
    const options = {
      host: this.mailOptions.host,
      port: this.mailOptions.port,
      username: this.mailOptions.username,
      password: this.mailOptions.password,
      from: this.mailOptions.from,
      to: chargeData.name + '<' + chargeData.email + '>',
      subject: 'Sua cobranca',
      text: this.mailOptions.text,
      html: customizedHtml,
      attachments: this.mailOptions.attachments
    }
    await this.mailService.send(options)
    return true
  }
}
