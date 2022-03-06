import { Router } from 'express'
import * as matchesCtrl from '../controllers/matches.js'

const router = Router()

// GET - localhost: 3000/matches
router.get('/', matchesCtrl.index)
// GET - localhost: 3000/matches/:id
router.get('/:id', matchesCtrl.show)


export {
  router
}