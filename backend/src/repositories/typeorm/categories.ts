import { appDataSource } from "..";
import { Category } from "../../entity/category";
import { ICategoriesRepository } from "../categories";
import { CategoriesModel } from "../models/categories";

export class CategoriesRepositoryORM implements ICategoriesRepository{
    private repository = appDataSource.getRepository(CategoriesModel)

    async save(category: Category): Promise<boolean> {
        const response = await this.repository.save(category)
        if(response){
            return true
        }
        return false
    }

    async findByName(name: string): Promise<Category | undefined> {
        const category = await this.repository.findOneBy({name})
        if(category){
            return category
        }
        return
    }

    async delete(id: string){
        const response = await this.repository.delete(id)
        if(response){
            return true
        }

        return false
    }
}