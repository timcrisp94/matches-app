import { Router } from 'express'
import * as matchesCtrl from '../controllers/matches.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

// GET - localhost: 3000/matches
router.get('/', matchesCtrl.index)
// GET - localhost: 3000/matches/new
router.get('/new', matchesCtrl.new)
// GET - localhost: 3000/matches/:id
router.get('/:id', matchesCtrl.show)
// GET - localhost:3000/matches/:id/edit
router.get('/:id/edit', isLoggedIn, matchesCtrl.edit) 

// POST - localhost:3000/matches/
router.post('/', isLoggedIn, matchesCtrl.create)
// POST - localhost:3000/matches/:id/wrestlers
router.post('/:id/wrestlers', isLoggedIn, matchesCtrl.addToMatch)
// POST - localhost:3000/matches/:id/ratings
router.post('/:id/ratings', isLoggedIn, matchesCtrl.createRating)

// PUT - localhost:3000/matches/:id
router.put("/:id", isLoggedIn, matchesCtrl.update)

// DELETE - localhost:3000/matches/:id
router.delete('/:id', isLoggedIn, matchesCtrl.delete)

export {
  router
}