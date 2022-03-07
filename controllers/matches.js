import { Match } from '../models/match.js'
import { Wrestler } from '../models/wrestler.js'

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
  const match = new Match(req.body)
  console.log(req.body.wrestlers)
  match.save(function(err) {
    if (err) {
      console.log(err)
      return res.redirect('/matches/new')
    } 
    console.log(match)
    console.log(err)
    res.redirect(`/matches/${match._id}`)
  })
}

function show(req, res) {
  Match.findById(req.params.id)
  .populate("wrestlers")
  .exec(function(err, match) {
    Wrestler.find({_id: {$nin: match.wrestlers}}, 
      function(err, wrestlers) {
        res.render('matches/show', {
          title: 'Match Details',
          match      
      })
    })
  })
}
  
function addToMatch(req, res) {
  Match.findById(req.params.id, function(err, match) {
    match.wrestlers.push(req.body.wrestlerId)
    match.save(function(err) {
      res.redirect(`/matches/${match._id}`)
    })
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
  update,
  addToMatch,
}

