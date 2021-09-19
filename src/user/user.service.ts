import { Service } from 'typedi'
import { UserInputError } from 'apollo-server-express'
import jwt from 'jsonwebtoken'
import { UserRepository } from './user.repository'
import { FieldError, LoginUserInput, RegisterUserInput } from './dtos'
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

  async getUser (email: string): Promise<User> {
    const user = await this.userRepo.getUserByEmail(email)
    if (!user) {
      throw new UserInputError('User not found')
    }
    return user
  }

  async loginUser (loginUserInput: LoginUserInput) {
    const { email, password } = loginUserInput
    const user = await this.userRepo.getUserByEmail(email) as User
    const match = await bcrypt.compare(password, user!.password)
    
    if (!match) {
      const error: FieldError = {
        field: 'password',
        messages: ['incorrect password']
      }
      return [null, error] as [null, FieldError]
    }
    const token = this.generateJWT(user)
    Object.assign(user, { token })
    return [user, null] as [User, null]
  }
}
