import { Profile } from "../models/profile.js"
import { Match } from '../models/match.js'


function index(req, res) {
  Profile.find({})
  .then(profiles => {
    res.render('profiles/index', {
      profiles,
      title: "Profile"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/profiles/${req.user.profile._id}`)
  })
}

function show(req, res) {
  Profile.findById(req.params.id)
  .then(profile => {
    Profile.findById(req.user.profile._id)
    .then(self => {
      const isSelf = self._id.equals(profile._id)
      Match.find({})
      .then(matches => {
        res.render("profiles/show", {
          title: `${profile.name}'s profile`,
          profile,
          isSelf,
          matches
        })
      })
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}




export {
  index,
  show
}