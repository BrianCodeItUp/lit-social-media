import { NonEmptyArray } from 'type-graphql'
import { UserResolver } from '../user'
import { PostResolver } from '../post'

export * from './mongoose'
export * from './middlewares'
export * from './objectTypes'

export const resolvers: NonEmptyArray<Function> = [
  PostResolver,
  UserResolver
]
