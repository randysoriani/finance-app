import { User } from "../entity/user";

export interface IUserRepository{
    save(user: User): Promise<boolean>
    delete(id: string): Promise<boolean>
    findByEmail(email: string): Promise<User | undefined>
    findById(id: string): Promise<User | undefined>
}