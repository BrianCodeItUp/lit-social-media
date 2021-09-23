import { prop, getModelForClass, modelOptions, Ref } from '@typegoose/typegoose'
import { Post } from '../post'
import { ObjectType , Field } from 'type-graphql'
import { User } from '../user'

@ObjectType()
@modelOptions({
  schemaOptions: {
    timestamps: true 
  }
})
export class Comment {
  @Field()
  readonly _id: string

  @Field()
  readonly createdAt: Date

  @Field()
  readonly updatedAt: Date

  @Field()
  @prop({ default: '' })
  body: string

  @Field(() => String)
  @prop({ ref: () => 'Post' })
  public post: Ref<Post>

  @Field(() => String)
  @prop({ ref: () => 'User' })
  public owner: Ref<User>
}

export const CommentModel = getModelForClass(Comment)
