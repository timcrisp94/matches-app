import mongoose from 'mongoose'

const profileSchema = new mongoose.Schema({
  name: String,
  avatar: String,
  matches: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Matches'
  }]
  
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)

export {
  Profile
}
