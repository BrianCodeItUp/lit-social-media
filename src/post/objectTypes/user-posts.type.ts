import { Field, ObjectType } from "type-graphql";
import { Post} from '../post.model'

@ObjectType()
export class UserPosts {
  @Field(() => [Post])
  posts: Post[]
}