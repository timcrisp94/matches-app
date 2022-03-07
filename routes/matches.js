import { Router } from 'express'
import * as matchesCtrl from '../controllers/matches.js'

const router = Router()

// GET - localhost: 3000/matches
router.get('/', matchesCtrl.index)
//GET - localhost: 3000/matches/new
router.get('/new', matchesCtrl.new)
// GET - localhost: 3000/matches/:id
router.get('/:id', matchesCtrl.show)
// GET - localhost:3000/matches/:id/edi
router.get('/:id/edit', matchesCtrl.edit)

// POST - localhost:3000/matches/
router.post('/', matchesCtrl.create)

// PUT - localhost:3000/matches/:id
  router.put(":/id", matchesCtrl.update)

// DELETE - localhost:3000/matches/:id
router.delete('/:id', matchesCtrl.delete)


export {
  router
}