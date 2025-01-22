import { nanoid } from "nanoid";
import { ICategoriesRepository } from "../../repositories/categories";

export class CreateCategory{
    constructor(private readonly repository: ICategoriesRepository){}

    async execute(name: string, icon?: string){
        if(!name){
            return new Error('Missing mandatory param')
        }

        const exists = await this.repository.findByName(name)
        if(exists){
            return new Error('Category name is already in use')
        }

        const id = nanoid()
        const response = await this.repository.save({id, name, icon})

        if(response){
            return {id, name}
        }

        return new Error('Impossible to create category')
    }
}