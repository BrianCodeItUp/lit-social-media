import { createUnionType } from 'type-graphql'
import { Error, DeleteResult } from '../../core'



export const DeletePostResponse = createUnionType({
  name: 'DeletePostResponse',
  types: () => [Error, DeleteResult] as const,
  resolveType: value => {
    if ("message" in value) {
      return Error 
    }
    
    return DeleteResult
  }
})
