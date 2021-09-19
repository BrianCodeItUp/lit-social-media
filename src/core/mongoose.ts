import { connect } from 'mongoose'

export async function initDatabase () {
  try {
    await connect(process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/social-media-clone')
    console.log('Database connected')
  } catch (e) {
    console.log(e)
  }
}
