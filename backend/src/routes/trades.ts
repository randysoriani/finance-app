import { Router } from 'express'
import { TradesController } from '../controllers/trades'

export const tradesRouter = Router()

tradesRouter.post('/', TradesController.create)