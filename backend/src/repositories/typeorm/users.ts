import { appDataSource } from "..";
import { User } from "../../entity/user";
import { UsersModel } from "../models/users";
import { IUserRepository } from "../users";

export class UserRepositoryORM implements IUserRepository{
    private repository = appDataSource.getRepository(UsersModel)

    async save(user: User): Promise<boolean> {
        const response = await this.repository.save({
            id: String(user.id),
            email: user.email,
            password: user.password
        })
        if(response){
            return true
        }

        return false
    }

    async delete(id: string): Promise<boolean> {
        const response = await this.repository.delete(id)
        if(response){
            return true
        }

        return false
    }
    
    async findByEmail(email: string): Promise<User | undefined> {
        const user = await this.repository.findOneBy({email})
        if(user){
            return user
        }
        return
    }

    async findById(id: string): Promise<User | undefined> {
        const user = await this.repository.findOneBy({id})
        if(user){
            return user
        }
        return
    }
}