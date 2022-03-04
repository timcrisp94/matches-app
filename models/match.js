import mongoose from 'mongoose'

const Schema = mongoose.Schema

const matchSchema = new Schema ({
  name: String,
  event: String,
  year: Number,
  company: String,
  
})

const Match = mongoose.model('Match', matchSchema)

export {
  Match
}

// GET /matches