import { Category } from "../entity/category";

export interface ICategoriesRepository {
    save(category: Category): Promise<boolean>
    findByName(name: string): Promise<Category | undefined>
    delete(id: string): Promise<boolean>
}