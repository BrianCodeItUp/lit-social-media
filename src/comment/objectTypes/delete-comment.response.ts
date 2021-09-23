import { createUnionType } from "type-graphql";
import { Error } from '../../core'
import { Comment } from '../comment.model'

export const DeleteCommentResponse = createUnionType({
  name: 'DeleteCommentResponse',
  types: () => [Comment, Error] as const,
  resolveType: value => {
    if ("message" in value) {
      return Error 
    }
    
    return Comment
  }
})
