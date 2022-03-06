import mongoose from 'mongoose'

const Schema = mongoose.Schema

const matchSchema = new Schema ({
  name: String,
  event: String,
  eventYear: {type: Number},
  company: String,
  wrestlers: [{type: Schema.Types.ObjectId, ref: 'Wrestler'}],
  owner: {type: Schema.Types.ObjectId, ref: 'Profile'}
}, {
  timestamps: true
})

const Match = mongoose.model('Match', matchSchema)

export {
  Match
}

// GET /matches