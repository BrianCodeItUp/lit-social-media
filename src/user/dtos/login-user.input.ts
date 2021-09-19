import { InputType, Field } from "type-graphql";
import { IsEmail, IsNotEmpty } from 'class-validator'
import { IsEmailExist } from '../decorators'

@InputType()
export class LoginUserInput {
  @IsEmailExist({ message: 'User with Email $value is not exist'})
  @IsEmail()
  @IsNotEmpty()
  @Field()
  email: string

  @IsNotEmpty()
  @Field()
  password: string
}