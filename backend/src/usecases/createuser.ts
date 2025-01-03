import jwt from 'jsonwebtoken'
import { nanoid } from 'nanoid'
import { hashSync } from 'bcryptjs';
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
                password: hashSync(password, 10)
            }
            const response = await this.repository.save(user)
            if(response){
                return {
                    id: user.id, 
                    accessToken: jwt.sign({}, String(process.env.JWT_SECRET), { expiresIn: 60 * 60 }), //1h
                    refreshToken: jwt.sign({}, String(process.env.JWT_SECRET), { expiresIn: 60 * 60 * 24 * 30 }) //30d
                }
            }
        }

        return
    }
  }