import { Resolver, Query, Mutation } from 'type-graphql'

@Resolver()
export class CommentResolver {
  @Query(() => String)
  hello () {
    return 'hello world'
  }
}

