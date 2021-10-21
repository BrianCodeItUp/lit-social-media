import 'reflect-metadata'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import cors from 'cors'
import { buildSchema } from 'type-graphql'
import { Container } from 'typedi'
import { resolvers, initDatabase } from './core'
import { useContainer } from 'class-validator'

async function main () {
  await initDatabase()
  const app = express()
  app.use(
    cors({
      origin: process.env.origin,
      credentials: true
    })
  )

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers,
      dateScalarMode: 'timestamp',
      container: () => {
        // register Container to class-validator
        useContainer(Container, {
          // Thess options need to be given due to this issue with typedi
          // https://github.com/typestack/class-validator/issues/928
          fallback: true,
          fallbackOnErrors: true
        })
        return Container
      },
      
      validate: false
    }),
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground()
    ],
    introspection: true,
    context: ({ req }) => ({ error: null, req })
  })
  await apolloServer.start()
  apolloServer.applyMiddleware({
    app,
    cors: false,
  })
  app.listen(process.env.PORT, () => {
    console.log(`server started on localhost:${process.env.PORT}/graphql`)
  })
}

main()
