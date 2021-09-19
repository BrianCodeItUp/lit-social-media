import { NonEmptyArray } from 'type-graphql'
import { UserResolver } from '../user'

export const resolvers: NonEmptyArray<Function> = [
  UserResolver
]

export * from './mongoose'
export * from './middlewares'
