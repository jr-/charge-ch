import { SendEmailInfo } from '../../domain/models/email'

export interface SendEmail {
  send: (sendEmailInfo: SendEmailInfo) => Promise<boolean>
}
