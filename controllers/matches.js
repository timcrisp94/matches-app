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

function newMatch(req, res) {
  res.render('matches/new')
}

function create(req, res) {
  console.log(req.body)
  const match = new Match(req.body)
  match.save(function(err) {
    if (err) {
      console.log(err)
      return res.redirect('/matches/new')
    } 
    console.log(match)
    console.log(err)
    res.redirect('/matches/new')
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
    res.redirect('/matches')
  })
}

function edit(req, res) {
  Match.findById(req.params.id, function(err, movie) {
    res.render('matches/edit', {
      movie,
      err,
      title: "Edit Match"
    })
  })
}

function update(req, res){
  Match.findByIdAndUpdate(req.params.id, 
    req.body, function(err, match) { 
      res.redirect(`/matches/${matches._id}`)
  }) 
}

function deleteMatch(req, res) {
  Match.findById(req.params.id)
  .then(match => {
    match.delete()
    .then(() => {
      res.redirect('/matches')
    })
  })
  .catch(err => {
    console.log('the error:', err)
    res.redirect('/matches')
  })
}

export {
  index,
  newMatch as new,
  create,
  show,
  deleteMatch as delete,
  edit,
  update
}

