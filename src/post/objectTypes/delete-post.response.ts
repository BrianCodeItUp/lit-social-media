import { createUnionType } from 'type-graphql'
import { Error } from '../../core'
import { Post } from '../post.model'


export const DeletePostResponse = createUnionType({
  name: 'DeletePostResponse',
  types: () => [Error, Post] as const,
  resolveType: value => {
    if ("message" in value) {
      return Error 
    }
    
    return Post
  }
})
