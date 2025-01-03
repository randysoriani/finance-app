import { User } from "../../entity/user"
import { IUserRepository } from "../users"

export class UserRepositoryInMemory implements IUserRepository{
    private users: User[] = []
  
    async save(user: User): Promise<boolean>{
        this.users.push(user)
        return true
    }

    async findByEmail(email: string): Promise<User | undefined> {
        const user = this.users.find(item => item.email == email)
        return user
    }
}