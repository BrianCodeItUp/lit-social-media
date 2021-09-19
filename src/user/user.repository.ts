import { Service } from 'typedi'
import bcrypt from 'bcryptjs'
import { UserModel, User } from './user.model'
import { RegisterUserInput } from './dtos'

@Service()
export class UserRepository {
  async creatUser (registerUserParams: RegisterUserInput):Promise<User> {
    const { username, password, email } = registerUserParams
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const user = new UserModel({
      username,
      password: hashedPassword,
      email
    })
    const newUser = await user.save()
    return newUser
  }

  async getUserByEmail (email: string) {
    const user = await UserModel.findOne({ email })
    return user
  }
}
