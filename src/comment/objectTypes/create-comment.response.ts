import { createUnionType } from "type-graphql";
import { Comment } from "../comment.model";
import { Error } from '../../core'

export const CreateCommentResponse = createUnionType({
  name: 'CreateCommentResponse',
  types: () => [Comment, Error] as const,
  resolveType: value => {
    if ("message" in value) {
      return Error 
    }
    
    return Comment
  }
})
