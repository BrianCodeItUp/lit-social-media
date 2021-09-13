import express from 'express'
import { ApolloServer, gql } from 'apollo-server-express'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import cors from 'cors'

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
      typeDefs: gql`
        type Query {
          hello: String
        }
      `,
      resolvers: {
        Query: {
          hello: () => {
            return 'hello world'
          }
        }
      },
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
