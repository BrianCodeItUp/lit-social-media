import { createUnionType } from 'type-graphql'
import { Error } from '../../core'
import { UserPosts } from './user-posts.type'


export const PostsResponse = createUnionType({
  name: 'PostsResponse',
  types: () => [UserPosts, Error] as const,
  resolveType: value => {
    if ("message" in value) {
      return Error 
    }
    
    return UserPosts    
  }
})
