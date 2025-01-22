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
}