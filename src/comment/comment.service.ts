import { Service } from "typedi";
import { CommentRepository } from './comment.respository'
import { Error } from '../core'
import { Comment } from "./comment.model";


@Service()
export class CommentService {
  constructor(private commentRepository: CommentRepository) {}

  getComments(postId: string) {
    return this.commentRepository.getCommentsByPost(postId)
  }

  createComment(userId: string, postId: string, body: string) {
    return this.commentRepository.createComment(userId, postId, body)
  }
  
  async deleteComment({ commentId, userId }: { commentId: string; userId: string }):
   Promise<[Comment, null] | [null, Error]>{
    const comment = await this.commentRepository.getCommentById(commentId)

    if (!comment) {
      const error = {
        message: `Comment not found`
      }
      return [null, error]
    }
    if (comment!.owner!.toString() !== userId) {
      const error = {
        message: 'Unauthorized to delete post'
      }
      return [null, error]
    }
    
    const deletedComment = await this.commentRepository.deleteComment(commentId)
    return [deletedComment, null]
  }
}