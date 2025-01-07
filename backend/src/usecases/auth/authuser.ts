import jwt from 'jsonwebtoken'
import { compareSync } from "bcryptjs";
import { IUserRepository } from "../../repositories/users";

export class AuthUser{
    constructor(private readonly repository: IUserRepository){}

    async execute(email: string, password: string){
        if(!email || !password){
            return new BadRequest('Missing mandatory params')
        }

        const user = await this.repository.findByEmail(email)

        if(user){
            if(compareSync(password, user.password)){
                return {
                    id: user.id, 
                    accessToken: jwt.sign({}, String(process.env.JWT_SECRET), { expiresIn: 60 * 60 }), //1h
                    refreshToken: jwt.sign({}, String(process.env.JWT_SECRET), { expiresIn: 60 * 60 * 24 * 30 }) //30d
                }
            } else {
                return new BadRequest('Password dont match')
            }
        } else {
            return new BadRequest('User not found')
        }

    }
}

export class BadRequest extends Error{
    public readonly message: string;
    public readonly status: number;

    constructor(message: string){
        super(message);
        this.message = message;
        this.status = 400;
    }
}