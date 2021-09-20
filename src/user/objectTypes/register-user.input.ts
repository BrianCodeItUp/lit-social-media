import { IsEmail, IsNotEmpty } from 'class-validator'
import { InputType, Field } from 'type-graphql'
import { IsEmailNotExist } from '../decorators'

@InputType()
export class RegisterUserInput {
  @IsNotEmpty()
  @Field()
  username: string

  
  @IsNotEmpty()
  @Field()
  password: string

  @IsEmailNotExist({ message: 'User $value already exists. Choose another email.'})
  @IsEmail()
  @IsNotEmpty()
  @Field()
  email: string
}
