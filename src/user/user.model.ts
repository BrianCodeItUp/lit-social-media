import { prop, getModelForClass, modelOptions, Ref } from '@typegoose/typegoose'
import { ObjectType, Field } from 'type-graphql'
import { Post } from '../post'

@ObjectType()
@modelOptions({
  schemaOptions: {
    timestamps: true 
  }
})
export class User {
  @Field()
  readonly _id: string

  @Field()
  readonly createdAt: Date

  @Field()
  readonly updatedAt: Date

  @Field()
  readonly token: string  // token get generated on user service

  @Field()
  @prop({ unique: true})
  username!: string

  @prop()
  password!: string

  @Field()
  @prop({ unique: true })
  email!: string

  @Field(() => [Post])
  @prop({ 
    ref: () => 'Post',
    foreignField: 'owner',
    localField: '_id' 
  })
  posts: Ref<Post>[]
}

export const UserModel = getModelForClass(User)
