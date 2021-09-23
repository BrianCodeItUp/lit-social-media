import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
export class DeleteResult {
  @Field(() => Int)
  deletedCount: number
}