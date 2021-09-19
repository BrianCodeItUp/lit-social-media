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
import { LoginUserInput, RegisterUserInput, UserResponse } from "./dtos";
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
      user
    };
  }

  @UseMiddleware(validateInput(LoginUserInput))
  @Mutation(() => UserResponse)
  async loginUser (
    @Arg("loginUserParams") loginUserParams: LoginUserInput, 
    @Ctx() context: { error: any }
  ): Promise<UserResponse> {
    if (context.error) { 
      return {
        errors: context.error,
        user: null
      }
    }

    const [user, error] = await this.userService.loginUser(loginUserParams)
    if (error) {
      return {
        errors: [error],
        user: null
      }
    }

    return {
      errors: null,
      user
    }
  } 
}
