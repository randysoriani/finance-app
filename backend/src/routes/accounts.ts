import { Router } from 'express'
import { AccountsController } from '../controllers/accounts'

export const accountsRouter = Router()

accountsRouter.post('/', AccountsController.create)
accountsRouter.get('/:id?', AccountsController.get)