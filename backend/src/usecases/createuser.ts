import { nanoid } from 'nanoid'
import { IUserRepository } from "../repositories/users";

export class CreateUser{
    constructor (private readonly repository: IUserRepository){}
  
    async execute(email: string, password: string){
        if(!email || !password){return}

        const exists = await this.repository.findByEmail(email)
        
        if(!exists){
            const user = {
                id: nanoid(),
                email,
                password
            }
            const response = await this.repository.save(user)
            if(response){
                return {id: user.id, accessToken: '123', refreshToken: '123'}
            }
        }

        return
    }
  }