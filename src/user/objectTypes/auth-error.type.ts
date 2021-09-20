import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class AuthError {
  @Field()
  message: string
}