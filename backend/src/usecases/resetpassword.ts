import { hashSync } from "bcryptjs";
import { IUserRepository } from "../repositories/users";

export class ResetPassword{
    constructor(private readonly repository: IUserRepository){}

    async execute(token: string, id: string, new_password: string){
        if(!id || !token || !new_password){
            return new BadRequest('Missing mandatory param')
        }

        const user = await this.repository.findById(id)

        if(!user){
            return new BadRequest('User not found')
        }

        if(user.reset_token === token){
            user.reset_token = ''
            user.password = hashSync(new_password, 10)
            this.repository.save(user)
            return true
        } else {
            return new BadRequest('Invalid token')
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