import { createUnionType } from 'type-graphql'
import { User } from '../user.model'
import { ArgumentErrors, AuthError } from '../../core';

export const UserResponse = createUnionType({
  name: 'UserResponse',
  types: () => [ArgumentErrors, User, AuthError],
  resolveType: value => {
    if (Object.keys(value).includes('errors')) {
      return ArgumentErrors
    }

    if ('username' in value) {
      return User
    }

    if ('message' in value) {
      return AuthError
    }
  }
})
