import { Request } from "express";
import { ArgumentErrors, AuthError } from './core'


export interface MyContext {
  error: ArgumentErrors | AuthError;
  req: Request;
  user?: any
}
