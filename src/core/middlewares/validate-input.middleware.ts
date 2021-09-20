import { ClassType, MiddlewareFn } from 'type-graphql'
import { validate } from 'class-validator'
import { plainToClass } from 'class-transformer'
import { MyContext } from 'src/types'

export function validateInput (Schema: ClassType): MiddlewareFn<MyContext> {
  return async ({ args, context }, next) => {
    const inputType = Object.keys(args)[0]
    const dto = plainToClass(Schema, args[inputType]) 
    const errors = await validate(dto)

    if (errors.length !== 0) {
      const formattedErrors = errors.map(error => ({
        field: error.property,
        messages: Object.values(error.constraints as { [type: string]: string; })
      }))
      context.error = {
        errors: formattedErrors
      }
    }

    return next()
  }
}