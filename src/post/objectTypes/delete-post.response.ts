import { createUnionType } from 'type-graphql'
import { Error } from '../../core'
import { Result } from './result.type'


export const DeletePostResponse = createUnionType({
  name: 'DeletePostResponse',
  types: () => [Error, Result] as const,
  resolveType: value => {
    if ("message" in value) {
      return Error 
    }
    
    return Result
  }
})
