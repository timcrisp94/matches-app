import { Router } from 'express'
import * as wrestlersCtrl from '../controllers/wrestlers.js'

const router = Router()

// GET - localhost: 3000/wrestlers/new
router.get('/new', wrestlersCtrl.new)

// POST - localhost:3000/wrestlers
router.post('/', wrestlersCtrl.create)




export {
  router
}