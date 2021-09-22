import { validateInput, authUser } from '../core/middlewares'
import { Resolver, Query, Mutation, Arg, UseMiddleware, Ctx } from 'type-graphql'
import { Service } from 'typedi'
import { CreatePostInput, CreatePostResponse, PostsResponse, PostResponse, DeletePostResponse } from './objectTypes'
import { PostService } from './post.service'
import { MyContext } from 'src/types'
import { Post } from './post.model'

@Service()
@Resolver()
export class PostResolver {
  constructor(private postService: PostService) {}

  @UseMiddleware(authUser)
  @Query(() => PostsResponse, { name: 'posts' })
  async posts (
    @Ctx() context: MyContext
  ): Promise<typeof PostsResponse> {
    if (context.error) {
      return context.error as Error
    }

    const userId = context.user!.id;
    const posts = await this.postService.getPosts(userId)
    return {
      posts
    }
  }
  
  @UseMiddleware(authUser)
  @Query(() => PostResponse)
  async post(
    @Arg('id') id: string,
    @Ctx() context: MyContext
  ): Promise<typeof PostResponse> {
    if (context.error) {
      return context.error as Error
    }
    
    const [post, error] = await this.postService.getPost(id)
    if (error) {
      return error
    }

    return post as Post
  }

  @UseMiddleware(authUser ,validateInput(CreatePostInput))
  @Mutation(() => CreatePostResponse)
  async createPost(
    @Arg('createPostParams') creatPostParams: CreatePostInput,
    @Ctx() context: MyContext
  ): Promise<typeof CreatePostResponse> {
    const { error, user } = context
    if(error) {
      return error 
    }
    const userId = user!.id
    const post = await this.postService.createPost(userId, creatPostParams)
    return post
  }

  @UseMiddleware(authUser)
  @Mutation(() => DeletePostResponse)
  async deletePost (
    @Arg('id') id: string,
    @Ctx() context: MyContext
  ): Promise<typeof DeletePostResponse> {
    if(context.error) {
      return context.error as Error
    }
    const userId = context.user!.id;
    const [succeed, error] = await this.postService.deletePost(userId, id)
  
    if (!succeed) {
      return error as Error
    }

    return {
      message: `Post ${id} deleted successfully`
    }
  }   
}

