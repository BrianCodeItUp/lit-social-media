import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Service } from 'typedi';

import { UserRepository } from '../user.repository';

@Service()
@ValidatorConstraint({ async: true })
export class IsEmailNotExistConstraint implements ValidatorConstraintInterface {
  constructor(private userRepository: UserRepository) {}
  validate(email: string) {
    return this.userRepository.getUser({ email }).then(user => {
        return !user
    })
  }
}

export function IsEmailNotExist(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEmailNotExistConstraint,
    });
  };
}
