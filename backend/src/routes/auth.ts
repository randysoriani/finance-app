import { Router } from 'express'
import { AuthController } from '../controllers/auth'

export const authRouter = Router()

authRouter.post('/', AuthController.create)
authRouter.post('/refreshtoken', )