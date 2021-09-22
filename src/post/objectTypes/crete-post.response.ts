import { createUnionType } from 'type-graphql'
import { ArgumentErrors, Error } from '../../core'
import { Post } from '../post.model'

export const CreatePostResponse = createUnionType({
  name: 'CreatePostResponse',
  types: () => [Post, ArgumentErrors, Error] as const,
  resolveType: value => {
    if (Object.keys(value).includes('errors')) {
      return ArgumentErrors
    }

    if ("message" in value) {
      return Error 
    }
    
    return Post
  }
})
