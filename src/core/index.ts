import { NonEmptyArray } from 'type-graphql'
import { UserResolver } from '../user'

export const resolvers: NonEmptyArray<Function> = [
  UserResolver
]
