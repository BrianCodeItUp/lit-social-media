import { Request } from "express";
import { ArgumentErrors, Error } from './core'

export interface UserPayload {
  id: string,
  email: string,
  username: string,
  iat: number,
  exp: number  
}

export interface MyContext {
  error: ArgumentErrors | Error;
  req: Request;
  user?: UserPayload
}
