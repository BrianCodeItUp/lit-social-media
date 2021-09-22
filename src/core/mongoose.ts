import { connect } from 'mongoose'

export async function initDatabase () {
  try {
    await connect(process.env.MONGODB_URL)
    console.log('Database connected')
  } catch (e) {
    console.log(e)
  }
}
