import { CategoriesRepositoryORM } from "../repositories/typeorm/categories"
import { CreateCategory } from "../usecases/categories/createcategory"
import { DeleteCategory } from "../usecases/categories/deletecategory"

export class CategoriesController{
    static async create(req: any, res: any){
        const { name, icon } = req.body

        if(!name){
            return res.status(400).json({status: 'error', message: 'Bad requisition'})
        }

        const repository = new CategoriesRepositoryORM()
        const service = new CreateCategory(repository)
        const response = await service.execute(name, icon)

        if(response instanceof Error){
            return res.status(500).json({status: 'error', message: 'Unable to create category'})
        } else {
            return res.status(201).json({
                status: 'ok', 
                message:'Category created', 
                payload: { 
                    response
                }
            })
        }
    }

    static async delete(req: any, res: any){
        const { id } = req.params
        if(!id){
            return res.status(400).json({status: 'error', message: 'Bad requisition'})
        }

        const repository = new CategoriesRepositoryORM()
        const service = new DeleteCategory(repository)
        const response = await service.execute(id)

        if(response instanceof Error){
            return res.status(500).json({status: 'error', message: 'Unable to delete category'})
        } else {
            return res.status(200).json({status: 'ok', message: 'Category deleted'})
        }

    }
}