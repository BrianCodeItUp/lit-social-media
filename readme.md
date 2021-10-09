# A simple Graphql backend for social media

Try to query at [Graphql Playground](https://infinite-wave-69962.herokuapp.com/graphql)
## Tech
- typescript
- express
- apollo-server
- type-graphql
  - Using typescript classes to create graphql schema.
- typegoose
  - Define Mongoose models using TypeScript classes and can also be used as graphql objectType
- typedi
  - Use dependency injection to inject services and repositories.

## Feature
- Create User
- Login User through JWT
- User can use CRUD on both their posts and comments
- Implement error handling through Graphql Union type to make frontend deal with different type of errors easier
