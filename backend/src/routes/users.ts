import { Router } from 'express'
import { UsersController } from '../controllers/users'

export const userRouter = Router()

userRouter.post('/', UsersController.create)