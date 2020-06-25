import IParseMailTemplateDTO from '../dtos/IPareseMailTemplateDTO'
import IMailTemplateProvider from '../models/IMailTemplateProvider'

class FakeMailTemplateProvider implements IMailTemplateProvider {
  public async parse({ template }: IParseMailTemplateDTO): Promise<string> {
    return template
  }
}

export default FakeMailTemplateProvider
