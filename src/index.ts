import 'reflect-metadata'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import cors from 'cors'
import { buildSchema } from 'type-graphql'
import { resolvers } from './core'

async function main () {
  try {
    const app = express()
    app.use(
      cors({
        origin: ['http://localhost:3000'],
        credentials: true
      })
    )

    const apolloServer = new ApolloServer({
      schema: await buildSchema({
        resolvers,
        validate: true
      }),
      plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground()
      ]
    })
    await apolloServer.start()
    apolloServer.applyMiddleware({
      app,
      cors: false
    })
    app.listen(4000, () => {
      console.log('server started on localhost:4000')
    })
  } catch (e) {
    console.log(e)
  }
}

main()
