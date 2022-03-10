import { Match } from '../models/match.js'
import { Wrestler } from '../models/wrestler.js'
import { Profile } from '../models/profile.js'

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
  req.body.creator = req.user.profile._id
  console.log(req.body)
  Match.create(req.body)
  .then(match => {
    Profile.findById(req.user.profile._id)
    .then(profile => {
      console.log("this is the match", match)
      profile.matches.push(match)
      profile.save()
      res.redirect(`/matches/${match._id}`)
    })
  })  
  .catch(err => {
    console.log(err)
    res.redirect('/matches')
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
          match,
          wrestlers      
      })
    })
  })
}

function addToMatch(req, res) {
  Match.findById(req.params.id).then(match => {
    console.log(req.body)
    match.wrestlers.push(req.body.wrestlerOneId)
    match.wrestlers.push(req.body.wrestlerTwoId)
    match.save()
    console.log(match)
    }).then(() => {
    res.redirect(`/matches/${req.params.id}`)
  })  
}

 


function createRating(req, res) {
  Match.findById(req.params.id)
  .then(match => {
    match.rating.push(req.body)
    match.save()
    .then(() => {
      res.redirect(`/matches/${match._id}`)
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/matches")
  })
}
function edit(req, res) {
  Match.findById(req.params.id, function(err, match) {
    console.log(match)
    res.render('matches/edit', {
      match,
      err,
      title: "Edit Match"
    })
  })
}

function update(req, res){
  console.log('id', req.params.id)
  Match.findById(req.params.id, 
    req.body, function(err, match) { 
      console.log(req.body)
      console.log('hi', match)
      res.redirect(`/matches/${match._id}`)
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
  createRating
}

