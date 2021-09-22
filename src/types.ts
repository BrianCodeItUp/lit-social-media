import { Request } from "express";
import { ArgumentErrors, AuthError } from './core'

export interface UserPayload {
  id: string,
  email: string,
  username: string,
  iat: number,
  exp: number  
}

export interface MyContext {
  error: ArgumentErrors | AuthError;
  req: Request;
  user?: UserPayload
}
