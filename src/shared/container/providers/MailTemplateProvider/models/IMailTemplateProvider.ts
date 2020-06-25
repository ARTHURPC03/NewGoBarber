import IParseMailTemplateDTO from '../dtos/IPareseMailTemplateDTO'

export default interface IMailTemplateProvider {
  parse(data: IParseMailTemplateDTO): Promise<string>
}
