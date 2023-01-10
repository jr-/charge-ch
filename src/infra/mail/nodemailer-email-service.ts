import * as nodemailer from 'nodemailer'

export interface EmailOptions {
  readonly host: string
  readonly port: number
  readonly username: string
  readonly password: string
  readonly from: string
  readonly to: string
  readonly subject: string
  readonly text: string
  readonly html: string
  readonly attachments: Object[]
}

export interface EmailService {
  send: (options: EmailOptions) => Promise<EmailOptions>
}

export class NodemailerEmailService implements EmailService {
  async send (options: EmailOptions): Promise<EmailOptions> {
    const transporter = nodemailer.createTransport({
      host: options.host,
      port: options.port,
      auth: {
        user: options.username,
        pass: options.password
      }
    })
    await transporter.sendMail({
      from: options.from,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
      attachments: options.attachments
    })
    return options
  }
}
