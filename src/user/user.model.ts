import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose'
import { ObjectType, Field } from 'type-graphql'

@ObjectType()
@modelOptions({
  schemaOptions: {
    timestamps: true
  }
})
export class User {
  @Field()
  readonly _id: string;

  @Field()
  readonly createdAt: Date

  @Field()
  readonly updatedAt: Date

  @Field()
  readonly token: string  // token get generated on user service

  @Field()
  @prop()
  username: string

  @prop()
  password: string

  @Field()
  @prop()
  email: string
}

export const UserModel = getModelForClass(User)
