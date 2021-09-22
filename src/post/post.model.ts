import { prop, getModelForClass, Ref, modelOptions } from '@typegoose/typegoose'
import { User } from '../user'
import { ObjectType, Field } from 'type-graphql'

@ObjectType()
@modelOptions({
  schemaOptions: {
    timestamps: true 
  }
})
export class Post {
  @Field()
  readonly _id: string

  @Field()
  readonly createdAt: Date

  @Field()
  readonly updatedAt: Date

  @Field()
  @prop()
  title!: string

  @Field()
  @prop({ default: '' })
  body: string

  @Field(() => String)
  @prop({ required: true, ref: () => 'User' })
  public owner: Ref<User>
}


export const PostModel = getModelForClass(Post)
