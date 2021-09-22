import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Result {
  @Field()
  message: string 
}