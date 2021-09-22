import { Field, InputType } from "type-graphql";
import { IsNotEmpty } from 'class-validator'

@InputType()
export class CreatePostInput {
  @IsNotEmpty()
  @Field()
  title!: string
  
  @Field({ defaultValue: ''})
  body?: string
}