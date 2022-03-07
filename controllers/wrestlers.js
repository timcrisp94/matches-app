import { Wrestler } from '../models/wrestler.js'

function newWrestler(req, res) {
  Wrestler.find({}, function (err, wrestlers) { 
    res.render('wrestlers/new', {
      title: 'Add Wrestler',
      wrestlers: wrestlers,
    })
  })
}

function create(req, res) {
  Wrestler.create(req.body, function (err, wrestler) {
    console.log(req.body)
     res.redirect('/wrestlers/new')
  })
}

export {
  newWrestler as new,
  create
}