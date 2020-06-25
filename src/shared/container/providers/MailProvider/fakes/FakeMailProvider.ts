import IMailProvider from '../models/IMailProvider'
import ISendMailDTO from '../dtos/ISendMailDTO'

export default class FakeMailProider implements IMailProvider {
  private messages: ISendMailDTO[] = []

  public async sendMail(message: ISendMailDTO): Promise<void> {
    this.messages.push(message)
  }
}
