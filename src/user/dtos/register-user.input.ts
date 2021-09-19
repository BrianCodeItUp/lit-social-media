import { IsEmail, IsNotEmpty } from 'class-validator'
import { InputType, Field } from 'type-graphql'
import { IsEmailAlreadyExist } from '../decorators'

@InputType()
export class RegisterUserInput {
  @IsNotEmpty()
  @Field()
  username: string

  
  @IsNotEmpty()
  @Field()
  password: string

  @IsEmailAlreadyExist({ message: 'User $value already exists. Choose another email.'})
  @IsEmail()
  @IsNotEmpty()
  @Field()
  email: string
}
