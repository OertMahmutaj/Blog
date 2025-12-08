import { Schema, model } from 'mongoose'

const userSchema = new Schema({
  username: String,
  name: String,
  passwordHash: String,
  notes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ],
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
})

const User = model('User', userSchema)

export default User