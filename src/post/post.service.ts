import { Service } from "typedi";
import { CreatePostInput } from "./objectTypes";
import { Post } from "./post.model";
import { PostRepository } from "./post.repository";
import { Error } from '../core'


@Service()
export class PostService {
  constructor(private postRepo: PostRepository) {}

  getPosts(userId: string): Promise<Post[]> {
    return this.postRepo.getPosts(userId)
  }

  async getPost(id: string): Promise<[null, Error] | [Post, null]> {
    const post = await this.postRepo.getPostById(id)
    if (!post) {
      const error = {
        message: `Post with id ${id} does not exist`
      }
      return [null, error]
    } 
    return [post, null]
  }

  createPost(userId: string, createPostParams: CreatePostInput) {
    return this.postRepo.createPost(userId, createPostParams)
  }

  async deletePost(userId: string, postId: string):
   Promise<[Post, null] | [null, Error]> {
    const post = await this.postRepo.getPostById(postId);
    if (!post) {
      const error = {
        message: `post with id ${postId} doesn't exist`
      }
      return [null, error]
    }

    if (post.owner!.toString() !== userId) {
      const error = {
        message: `Unauthorized to delete post ${postId}`
      }
      return [null, error]
    }
    const deletedPost = await this.postRepo.deletePost(postId) as Post
    return [deletedPost, null]
  }
}
