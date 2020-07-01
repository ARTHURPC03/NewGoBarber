interface IMailConfig {
  driver: 'ethereal' | 'ses'

  defaults: {
    from: {
      email: string
      name: string
    }
  }
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    from: {
      email: 'arthurpc@rocketseat.com.br',
      name: 'ARTHUR PC',
    },
  },
} as IMailConfig
