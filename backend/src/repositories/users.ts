import { User } from "../entity/user";

export interface IUserRepository{
    save(user: User): Promise<boolean>
    findByEmail(email: string): Promise<User | undefined>
}