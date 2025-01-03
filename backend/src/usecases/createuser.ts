import { IUserRepository } from "../repositories/users";

export class CreateUser{
    constructor (private readonly repository: IUserRepository){}
  
    async execute(email: string, password: string){
        if(!email || !password){return}

        const exists = await this.repository.findByEmail(email)
        console.log(exists)
        if(!exists){
            const response = await this.repository.save({id: '123', email, password})
            if(response){
                return {id: '132', accessToken: '123', refreshToken: '123'}
            }
        }

        return
    }
  }