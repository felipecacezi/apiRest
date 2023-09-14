import { Router } from 'express'
import * as ApiController from '../src/controllers/apiController'

const router = Router()
router.post('/frases', ApiController.createPhrase)
router.get('/frase/:id', ApiController.getPhrase)
router.get('/frases', ApiController.listPhrases)
router.put('/frase/:id', ApiController.updatePhrase)
router.delete('/frase/:id', ApiController.deletePhrase)

export default router