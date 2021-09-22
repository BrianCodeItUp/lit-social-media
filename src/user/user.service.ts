import { Service } from 'typedi'
import jwt from 'jsonwebtoken'
import { UserRepository } from './user.repository'
import {  LoginUserInput, RegisterUserInput } from './objectTypes'
import { Error } from '../core'
import { User } from './user.model'
import bcrypt from 'bcryptjs'

@Service()
export class UserService {
  constructor (private userRepo: UserRepository) {}
  private generateJWT(user: User) {
    const token = jwt.sign({
      id: user._id,
      email: user.email,
      username: user.username
    }, process.env.SECRET_KEY, { expiresIn: '3 days' })
    return token
  }

  async createUser (options: RegisterUserInput) {
    const newUser = await this.userRepo.creatUser(options)
    const token = this.generateJWT(newUser)
    Object.assign(newUser, { token })
    return newUser
  }

  async getUser (id: string): Promise<[User, null] | [null, Error]> {
    const user = await this.userRepo.getUser({ _id: id })
    if (!user) {
      const error = {
        message: `Can't find user`
      }
      return [null, error]
    }
    return [user, null]
  }

  async loginUser (loginUserInput: LoginUserInput): Promise<[User, null] | [null, Error]>  {
    const { email, password } = loginUserInput
    const user = await this.userRepo.getUser({ email }) as User
    const match = await bcrypt.compare(password, user!.password)
    
    if (!match) {
      const error = {
        message: 'user account or password is wrong'
      }
      return [null, error]
    }

    const token = this.generateJWT(user)
    Object.assign(user, { token })
    return [user, null] 
  }
}
