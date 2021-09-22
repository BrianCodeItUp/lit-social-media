import { MiddlewareFn } from 'type-graphql'
import jwt from 'jsonwebtoken'
import { MyContext } from '../../types';

const AUTH_ERR_BY_TYPE = {
  INVALID_TOKEN: { message: 'Invalid/Expired token' },
  MISS_BEARER_TOKEN: { message: 'Authentication token must be \'Bearer [token]'},
  MISS_AUTH_HEADER: { message: 'Authentication header must be provided'} 
}
export const authUser: MiddlewareFn<MyContext> = async ({ context }, next) => {
  const { req } = context
  const authHeader = req.headers.authorization
  
  if (authHeader) {
    const token = authHeader.split("Bear ")[1];
    if (token) {
      try {
        const user = jwt.verify(token, process.env.SECRET_KEY)
        context.user = user
      } catch(e) {
        context.error = AUTH_ERR_BY_TYPE.INVALID_TOKEN
      }
    }
    context.error = AUTH_ERR_BY_TYPE.MISS_BEARER_TOKEN
  } else {
    context.error = AUTH_ERR_BY_TYPE.MISS_AUTH_HEADER
  }

  return await next();
};