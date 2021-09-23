import {
  Mutation,
  Query,
  Resolver,
  Arg,
  UseMiddleware,
  Ctx,
  FieldResolver,
  Root
} from "type-graphql";
import { Service } from "typedi";
import { User } from "./user.model";
import { UserService } from "./user.service";
import { LoginUserInput, RegisterUserInput, UserResponse } from "./objectTypes";
import { validateInput, authUser } from "../core/middlewares";
import { MyContext } from "../types";
import { Post } from '../post'
import { PostService } from "../post";
import { DocumentType } from "@typegoose/typegoose/lib/types";


@Service()
@Resolver(() => User)
export class UserResolver {
  constructor(
    private userService: UserService,
    private postService: PostService) {}
  
  @UseMiddleware(authUser)
  @Query(() => UserResponse)
  async me(@Ctx() context: MyContext): Promise<typeof UserResponse> {
    if (context.error) {
      return context.error
    }

    const userId = context.user!.id;
    const [user, error] = await this.userService.getUser(userId);
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
  
  @FieldResolver(() => [Post])
  async posts(@Root() root: DocumentType<User>,) {
    const userId = root.id;
    const posts = await this.postService.getPosts(userId)
    return posts
  }
}
