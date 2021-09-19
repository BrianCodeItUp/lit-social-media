import { Field, ObjectType } from 'type-graphql'
import { User } from '../user.model'

@ObjectType()
class FieldError {
  @Field()
  field: string;

  @Field(() => [String])
  messages: string[];
}

@ObjectType()
export class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[] | null;

  @Field(() => User, { nullable: true })
  user?: User | null;
}
