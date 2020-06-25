import IParseMailTemplateDTO from '@shared/container/providers/MailTemplateProvider/dtos/IParseMailtemplateDTO'

interface IMailContact {
  name: string
  email: string
}

export default interface ISendMailDTO {
  to: IMailContact
  from?: IMailContact
  subject: string
  templateData: IParseMailTemplateDTO
}
