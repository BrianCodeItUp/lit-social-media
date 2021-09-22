import { MiddlewareFn } from 'type-graphql'
import jwt from 'jsonwebtoken'
import { MyContext, UserPayload } from '../../types';


const AUTH_ERR_BY_TYPE = {
  INVALID_TOKEN: { message: 'Invalid/Expired token' },
  MISS_BEARER_TOKEN: { message: 'Authentication token must be provided. Add token to authorization in header'},
}
export const authUser: MiddlewareFn<MyContext> = async ({ context }, next) => {
  const { req } = context

  const authHeader = req.headers.authorization
  const token = authHeader ? authHeader.split("Bearer ")[1] : ''
  if (token) {
    try {
      const user = jwt.verify(token, process.env.SECRET_KEY) as UserPayload
      context.user = user
    } catch(e) {
      context.error = AUTH_ERR_BY_TYPE.INVALID_TOKEN
    }
  } else {
    context.error = AUTH_ERR_BY_TYPE.MISS_BEARER_TOKEN
  }
  
  return await next();
};