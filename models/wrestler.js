import mongoose from 'mongoose'

const Schema = mongoose.Schema

const wrestlerSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },   
  //matches: {ObjectId, ref: 'Match'}
})

const Wrestler = mongoose.model('Wrestler', wrestlerSchema)

export {
  Wrestler
}

