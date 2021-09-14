import { Query, Resolver } from 'type-graphql'

@Resolver()
class UserResolver {
  @Query(() => String)
  hello () {
    return 'hello world'
  }
}

export default UserResolver
