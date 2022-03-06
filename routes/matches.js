import { Router } from 'express'
import * as matchesCtrl from '../controllers/matches.js'

const router = Router()

// GET - localhost: 3000/matches
router.get('/', matchesCtrl.index)
//GET - localhost: 3000/matches/new
router.get('/new', matchesCtrl.new)
// GET - localhost: 3000/matches/:id
router.get('/:id', matchesCtrl.show)

// POST - localhost:3000/matches/new
router.post('/', isLoggedIn, matchesCtrl.create)

// DELETE - localhost:3000/matches/:id
router.delete('/:id', matchesCtrl.delete)


export {
  router
}