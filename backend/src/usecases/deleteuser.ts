import { IUserRepository } from "../repositories/users";

export class DeleteUser{
    constructor (private readonly repository: IUserRepository){}
  
    async execute(id: string){
        if(!id){
            return new Error('Invalid id')
        }

        const exists = await this.repository.findById(id)
        
        if(exists){
            await this.repository.delete(id)
            return true
        } else {
            return new Error('User dont exists')
        }
    }
}