import { Resolver, Query, Mutation, Arg, UseMiddleware, Ctx, FieldResolver, Root } from 'type-graphql'
import { validateInput, authUser } from '../core/middlewares'
import { DeleteResult } from '../core'
import { Service } from 'typedi'
import { CreatePostInput, CreatePostResponse, PostsResponse, PostResponse, DeletePostResponse } from './objectTypes'
import { PostService } from './post.service'
import { MyContext } from 'src/types'
import { Post } from './post.model'
import { DocumentType } from '@typegoose/typegoose'
import { Comment } from '../comment'
import { CommentService } from '../comment'


@Service()
@Resolver(() => Post)
export class PostResolver {
  constructor(private postService: PostService, private commentService: CommentService) {}

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
    const [deleteResult, error] = await this.postService.deletePost(userId, id)
  
    if (error) {
      return error 
    }

    return deleteResult as DeleteResult
  }

  @FieldResolver()
  async comments(@Root() root: DocumentType<Comment>) {
    const postId = root.id
    const comments = await this.commentService.getComments(postId)
    return comments
  }
}

