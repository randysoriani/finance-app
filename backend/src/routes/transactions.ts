import { Router } from 'express'
import { TransactionsController } from '../controllers/transactions'

export const transactionsRouter = Router()

transactionsRouter.post('/', TransactionsController.create)