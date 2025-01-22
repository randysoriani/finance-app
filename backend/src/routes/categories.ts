import { Router } from 'express'
import { CategoriesController } from '../controllers/categories'

export const categoriesRouter = Router()

categoriesRouter.post('/', CategoriesController.create)
categoriesRouter.delete('/:id', CategoriesController.delete)