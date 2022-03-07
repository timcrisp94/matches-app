import mongoose from 'mongoose'

const Schema = mongoose.Schema

const reviewSchema = new Schema({
  content: String,
  rating: {type: Number, min: 1, max: 5, default: 5}
}, {
  timestamps: true
})


const matchSchema = new Schema ({
  wrestlers: [{
    type: Schema.Types.ObjectId, 
    ref: 'Wrestler'
  }],
  company: {
    type: String,
    required: true
  }, 
  event: {
    type: String,
    required: true
  },
  //stretch goal 
  //title : { type: Boolean, default: false },
  eventYear: {
    type: Number
  },
  rating: {
    type: String,
    enum: [
      "1", "2", "3", "4", "5"
      ]
  },
  owner: {
    type: Schema.Types.ObjectId, 
    ref: 'Profile'
  },
}, {
  timestamps: true
})

const Match = mongoose.model('Match', matchSchema)

export {
  Match
}

