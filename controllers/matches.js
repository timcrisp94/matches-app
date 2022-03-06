import { Match } from '../models/match.js'

function index(req, res) {
  Match.find({})
  .then(matches => {
    res.render('matches/index', {
      matches,
      title: 'Matches'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/matches')
  })
}

function show(req, res) {
  Match.findById(req.params.id)
  .populate("owner")
  .then(match => {
    console.log(match)
    res.render('matches/show', {
      match,
      title: "show"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/matches")
  })
}

export {
  index,
  show
}