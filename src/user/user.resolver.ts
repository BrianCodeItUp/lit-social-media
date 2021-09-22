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
import { LoginUserInput, RegisterUserInput, UserResponse } from "./objectTypes";
import { validateInput } from "../core/middlewares";
import { MyContext } from "../types";

@Service()
@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}
  @Query(() => UserResponse)
  async getUser(@Arg("email") email: string): Promise<typeof UserResponse> {
    const [user, error] = await this.userService.getUser(email);
    if (error) {
      return error
    }

    return user as User
  }

  @UseMiddleware(validateInput(RegisterUserInput))
  @Mutation(() => UserResponse)
  async registerUser(
    @Arg("registerUserParams") registerUserParams: RegisterUserInput,
    @Ctx() context: MyContext
  ): Promise<typeof UserResponse> {
    if (context.error) {
      return context.error
    }

    const user = await this.userService.createUser(registerUserParams);
    return user
  }

  @UseMiddleware(validateInput(LoginUserInput))
  @Mutation(() => UserResponse)
  async loginUser (
    @Arg("loginUserParams") loginUserParams: LoginUserInput, 
    @Ctx() context: MyContext
  ): Promise<typeof UserResponse> {
    if (context.error) {
      return context.error
    }

    const [user, error] = await this.userService.loginUser(loginUserParams)
    if (error) {
      return error
    }

    return user as User
  } 
}
