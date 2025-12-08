import { Schema, model } from 'mongoose'

const blogSchema = Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  url: { type: String, required: true },
  likes: { type: String, default: '0' },
  user : {
    type : Schema.Types.ObjectId,
    ref : 'User'
  }
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


export default model('Blog', blogSchema)
