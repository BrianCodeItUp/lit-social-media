import { createUnionType } from 'type-graphql'
import { User } from '../user.model'
import { ArgumentErrors } from '../../core';
import { AuthError } from './auth-error.type';

export const UserResponse = createUnionType({
  name: 'UserResponse',
  types: () => [ArgumentErrors, User, AuthError],
  resolveType: value => {
    if ("errors" in value) {
      return ArgumentErrors
    }
    if ("username" in value) {
      return User
    }

    if ("message" in value) {
      return AuthError
    }
  }
})


