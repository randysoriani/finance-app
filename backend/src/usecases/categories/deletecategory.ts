import { ICategoriesRepository } from "../../repositories/categories"

export class DeleteCategory{
    constructor(private readonly repository: ICategoriesRepository){}

    async execute(id: string){
        if(!id){
            return new Error('Missing mandatory param')
        }

        const response = await this.repository.delete(id)
        if(!response){
            return new Error('Category not found')
        } else {
            return true
        }
    }
}