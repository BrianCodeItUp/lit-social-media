import { Service } from 'typedi'
import { UserInputError } from 'apollo-server-express'
import jwt from 'jsonwebtoken'
import { UserRepository } from './user.repository'
import { RegisterUserInput } from './dtos'
import { User } from './user.model'

@Service()
export class UserService {
  constructor (private userRepo: UserRepository) {}
  async createUser (options: RegisterUserInput) {
    const newUser = await this.userRepo.creatUser(options)
    const token = jwt.sign({
      id: newUser._id,
      email: newUser.email,
      username: newUser.username
    }, process.env.SECRET_KEY, { expiresIn: '3 days' })

    return {
      ...newUser,
      token
    }
  }

  async getUser (email: string): Promise<User> {
    const user = await this.userRepo.getUserByEmail(email)
    if (!user) {
      throw new UserInputError('User not found')
    }
    return user
  }
}
