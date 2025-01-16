import { compareSync } from "bcryptjs";
import { IUserRepository } from "../../repositories/users";
import { GenerateAccessJWT, GenerateRefreshJWT } from '../../helpers/jwt-generators';

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
                    accessToken: GenerateAccessJWT({user_id: user.id}),
                    refreshToken: GenerateRefreshJWT({user_id: user.id}) //30d
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