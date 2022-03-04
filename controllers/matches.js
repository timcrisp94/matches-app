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

export {
  index
}