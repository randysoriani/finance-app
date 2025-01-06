import { Router } from 'express'
import { InstitutionController } from '../controllers/institutions'

export const institutionRouter = Router()

institutionRouter.post('/', InstitutionController.create)
institutionRouter.delete('/:id', InstitutionController.delete)
institutionRouter.put('/:id', InstitutionController.update)