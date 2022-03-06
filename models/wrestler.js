import mongoose from 'mongoose'

const Schema = mongoose.Schema

const wrestlerSchema = new Schema({
  name: String,
  matches: {ObjectId, ref: 'Matches'}
})

const Wrestler = mongoose.model('Wrestler', wrestlerSchema)

export {
  Wrestler
}

