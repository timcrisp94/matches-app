import { Router } from 'express'
import * as matchesCtrl from '../controllers/matches.js'

const router = Router()

router.get('/', matchesCtrl.index)


export {
  router
}