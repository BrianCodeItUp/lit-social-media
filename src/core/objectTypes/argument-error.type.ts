import { Field, ObjectType } from 'type-graphql';


@ObjectType()
export class ArgumentError {
  @Field()
  field: string;

  @Field(() => [String])
  messages: string[];
}

@ObjectType()
export class ArgumentErrors {
  @Field(() => [ArgumentError])
  errors: ArgumentError[]
}