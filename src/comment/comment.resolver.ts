import { Error, DeleteResult } from '../core'
import { authUser } from '../core/middlewares/auth-user.middleware'
import { Resolver, Mutation, Arg, Ctx, UseMiddleware } from 'type-graphql'
import { MyContext } from '../types'
import { CommentService } from './comment.service'
import { CreateCommentResponse, DeleteCommentResponse } from './objectTypes'
import { Service } from 'typedi'

@Service()
@Resolver()
export class CommentResolver {
  constructor (private commentService: CommentService) {}

  @UseMiddleware(authUser)
  @Mutation(() => CreateCommentResponse)
  async createComment (
    @Arg('postId') postId: string,
    @Arg('body') body: string,
    @Ctx() context: MyContext
  ) {
    if (context.error) {
      return context.error as Error
    }
    const userId = context.user!.id
    const comment = await this.commentService.createComment(userId, postId, body)
    return comment
  }

  @UseMiddleware(authUser)
  @Mutation(() => DeleteCommentResponse)
  async deleteComment(
    @Arg('id') id: string,
    @Ctx() context: MyContext
  ): Promise<typeof DeleteCommentResponse> {
    if (context.error) {
      return context.error as Error
    }
    
    const userId = context.user!.id
    const [deleteResult, error] = await this.commentService.deleteComment({ userId, commentId: id })

    if (error) {
      return error as Error
    }

    return deleteResult as DeleteResult
  }
}
