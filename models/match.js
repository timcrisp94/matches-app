import mongoose from 'mongoose'

const Schema = mongoose.Schema

const reviewSchema = new Schema({
  content: String,
  rating: {type: Number, min: 1, max: 5, default: 5}
}, {
  timestamps: true
})


const matchSchema = new Schema ({
  name: {
    type: String,
    required: true
  }, 
  event: {
    type: String,
    required: true
  },
  eventYear: {
    type: Number
  },
  company: {
    type: String,
    required: true
  },  
  // wrestlers: [{type: Schema.Types.ObjectId, ref: 'Wrestler'}],
  // reviews: [reviewSchema]
  // owner: {type: Schema.Types.ObjectId, ref: 'Profile'},
}, {
  timestamps: true
})

const Match = mongoose.model('Match', matchSchema)

export {
  Match
}

// GET /matches