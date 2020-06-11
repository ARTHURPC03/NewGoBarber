import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import authConfig from '@config/auth'

import AppError from '@shared/errors/AppError'
import IUsersRepository from '../repositories/IUsersRepository'

import User from '../infra/typeorm/entities/User'

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: User
  token: string
}

class AuthenticateUserService {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('Incorrect email/password combination', 401)
    }

    const passwordMatched = await compare(password, user.password)

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination', 401)
    }

    const { secret, expiresIn } = authConfig.jwt

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    })

    return { user, token }
  }
}

export default AuthenticateUserService
