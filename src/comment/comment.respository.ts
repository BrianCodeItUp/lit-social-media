import { Service } from "typedi";
import { CommentModel } from './comment.model'

@Service()
export class CommentRepository {
  async createComment(userId: string, postId: string, body: string) {
    try {
      const newComment = new CommentModel({
        body,
        owner: userId,
        post: postId
      })
      
      const comment = await newComment.save()
    
      return comment
    } catch (e) {
      throw new Error(e)
    }
  }

  async getCommentById(id: string) {
    try {
      const comment = await CommentModel.findById(id)
      return comment
    } catch (e) {
      throw new Error(e)
    }
  }

  async getCommentsByPost(postId: string) {
    try {
      const comments = await CommentModel.find({ post: postId }).sort({ createdAt: -1 })
      return comments
    } catch (e) {
      throw new Error(e)
    }
  }

  async deleteComment(id: string) {
    try {
      const comment = await CommentModel.findById(id);
      const deletedComment = await comment!.remove()
      return deletedComment
    } catch (e) {
      throw new Error(e)
    }
  }
}