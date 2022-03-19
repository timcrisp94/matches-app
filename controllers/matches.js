import { Match } from '../models/match.js'
import { Wrestler } from '../models/wrestler.js'
import { Profile } from '../models/profile.js'


function index(req, res) {
  Match.find({})
  .then(matches => {
    res.render('matches/index', {
      matches,
      title: 'Matches',
      user: req.user
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
  req.body.owner = req.user.profile._id
  Match.create(req.body)
  .then(match => {
    res.redirect(`/matches/${match._id}`)
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
  Match.findById(req.params.id)
  .then(match => { 
    res.render('matches/edit', {
      match,
      title: "Edit Match"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/matches')
  })
}
  
    

function update(req, res){
  console.log(req.params.id)
  console.log(req.body)
  Match.findByIdAndUpdate(req.params.id, req.body)  
  .then(matches => {    
    if (matches.owner.equals(req.user.profile._id)) {
      
      matches.updateOne(req.body, {new: true})
       
      .then(() => {
        res.redirect('/matches')
      })
    } else {
      throw new Error ("Disqualified!")
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect("/matches")
  })
}

function deleteMatch(req, res) {
  Match.findById(req.params.id)
  .then(matches => {
    if (matches.owner.equals(req.user.profile._id)) {
        matches.delete()
      .then(() => {
        res.redirect('/matches')
      })
    } else {
      throw new Error ("Disqualified!")
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect("/matches")
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

