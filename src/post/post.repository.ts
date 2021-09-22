import { Error } from 'mongoose'
import { Service } from 'typedi'
import { CreatePostInput } from './objectTypes'
import { PostModel } from './post.model'

@Service()
export class PostRepository {
  async getPosts(id: string) {
    try {
      const posts = await PostModel.find({ owner: id }).sort({ createdAt: -1 })
      return posts
    } catch (e) {
      throw new Error(e)
    }
  }

  async getPostById(id: string) {
    try {
      const post = await PostModel.findById(id)
      return post
    } catch (e) {
      throw new Error(e)
    }
  }

  async createPost(userId: string, createPostParams: CreatePostInput) {
    const { title, body = ''} = createPostParams
    
    try {
      const post = new PostModel({
        title,
        body,
        owner: userId
      })
      return await post.save()
    } catch (e) {
      throw new Error(e)
    }
  }

  async deletePost(postId: string) {
    try {
      const post = await PostModel.deleteOne({ id: postId })
      return post
    } catch(e) {
      throw new Error(e)
    }
  }
}
