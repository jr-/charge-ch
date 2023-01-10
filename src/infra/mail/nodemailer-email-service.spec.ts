import { NodemailerEmailService, EmailOptions } from './nodemailer-email-service'

const makeSut = (): NodemailerEmailService => {
  return new NodemailerEmailService()
}

const attachmentFilePath: string = 'any_file_path'

const fromName = 'Test'
const fromEmail = 'from_email@mail.com'
const toName = 'any_name'
const toEmail = 'any_email@mail.com'
const subject = 'Test e-mail'
const emailBody = 'Hello world attachment test'
const emailBodyHtml = '<b>Hello world attachment test HTML</b>'
const attachments = [{
  filename: attachmentFilePath,
  contentType: 'text/plain'
}]

const mailOptions: EmailOptions = {
  host: 'any_host',
  port: 867,
  username: 'any_username',
  password: 'any_password',
  from: fromName + ' ' + fromEmail,
  to: toName + ' <' + toEmail + '>',
  subject,
  text: emailBody,
  html: emailBodyHtml,
  attachments
}

jest.mock('nodemailer')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const nodemailer = require('nodemailer')
const sendMailMock = jest.fn().mockReturnValueOnce('ok')
nodemailer.createTransport.mockReturnValue({ sendMail: sendMailMock })

beforeEach(() => {
  sendMailMock.mockClear()
  nodemailer.createTransport.mockClear()
})

describe('Nodemailer mail service adapter', () => {
  test('Should return ok if email is sent', async () => {
    const sut = makeSut()
    sendMailMock.mockReturnValueOnce('ok')
    const result = await sut.send(mailOptions)
    expect(result).toEqual(mailOptions)
  })

  test('Should call nodemailer createTransport with correct options', async () => {
    const sut = makeSut()
    const spyCreateTransport = jest.spyOn(nodemailer, 'createTransport')
    await sut.send(mailOptions)
    expect(spyCreateTransport).toHaveBeenCalledWith({
      host: 'any_host',
      port: 867,
      auth: {
        user: 'any_username',
        pass: 'any_password'
      }
    })
  })
})
