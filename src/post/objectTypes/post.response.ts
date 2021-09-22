import { createUnionType } from 'type-graphql'
import { Error } from '../../core'
import { Post } from '../post.model'


export const PostResponse = createUnionType({
  name: 'PostResponse',
  types: () => [Post, Error] as const,
  resolveType: value => {
    if ("message" in value) {
      return Error 
    }
    
    return Post
  }
})
