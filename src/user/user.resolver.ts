import {
  Mutation,
  Query,
  Resolver,
  Arg,
  UseMiddleware,
  Ctx,
} from "type-graphql";
import { Service } from "typedi";
import { User } from "./user.model";
import { UserService } from "./user.service";
import { RegisterUserInput, UserResponse } from "./dtos";
import { validateInput } from "../core/middlewares";

@Service()
@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}
  @Query(() => User)
  async getUser(@Arg("email") email: string): Promise<User> {
    const user = this.userService.getUser(email);
    return user;
  }

  @UseMiddleware(validateInput(RegisterUserInput))
  @Mutation(() => UserResponse)
  async registerUser(
    @Arg("registerUserParams") registerUserParams: RegisterUserInput,
    @Ctx() context: { error: any }
  ): Promise<UserResponse> {
    if (context.error) {
      return {
        errors: context.error,
        user: null,
      };
    }

    const user = await this.userService.createUser(registerUserParams);
    return {
      errors: null,
      user,
    };
  }
}
