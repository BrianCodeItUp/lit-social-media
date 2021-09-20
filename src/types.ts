import { Request } from "express";
import { ArgumentErrors } from './core'


export interface MyContext {
  error: ArgumentErrors | null;
  req: Request;
  user?: any
}