import IParseMailTemplateDTO from '../dtos/IParseMailtemplateDTO'

export default interface IMailTemplateProvider {
  parse(data: IParseMailTemplateDTO): Promise<string>
}
