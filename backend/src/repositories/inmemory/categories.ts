import { Category } from "../../entity/category"
import { ICategoriesRepository } from "../categories"

export class CategoriesRepositoryInMemory implements ICategoriesRepository{
    
    private categories: Category[] = []

    async save(category: Category): Promise<boolean> {
        this.categories.push(category)
        return true
    }

    async findByName(name: string): Promise<Category | undefined> {
        const category = this.categories.find(item => item.name === name)
        return category
    }

    async delete(id: string): Promise<boolean> {
        const exists = this.categories.find(item => item.id === id)
        if(exists){
            this.categories.filter(item => item.id === id)
            return true
        }
        return false
    }
}