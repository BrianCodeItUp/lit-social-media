import { createUnionType } from 'type-graphql'
import { User } from '../user.model'
import { ArgumentErrors, Error } from '../../core';

export const UserResponse = createUnionType({
  name: 'UserResponse',
  types: () => [ArgumentErrors, User, Error],
  resolveType: value => {
    if (Object.keys(value).includes('errors')) {
      return ArgumentErrors
    }

    if ('message' in value) {
      return Error
    }

    return User
  }
})
