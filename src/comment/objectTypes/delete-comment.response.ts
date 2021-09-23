import { createUnionType } from "type-graphql";
import { Error, DeleteResult } from '../../core'

export const DeleteCommentResponse = createUnionType({
  name: 'DeleteCommentResponse',
  types: () => [DeleteResult, Error] as const,
  resolveType: value => {
    if ("message" in value) {
      return Error 
    }
    
    return DeleteResult
  }
})
