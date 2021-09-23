import { NonEmptyArray } from 'type-graphql'
import { UserResolver } from '../user'
import { CommentResolver } from '../comment'
import { PostResolver } from '../post'

export * from './mongoose'
export * from './middlewares'
export * from './objectTypes'

export const resolvers: NonEmptyArray<Function> = [
  CommentResolver,
  PostResolver,
  UserResolver
]
