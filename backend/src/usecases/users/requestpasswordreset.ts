import { createHash } from 'node:crypto'
import { IUserRepository } from "../../repositories/users";

export class RequestPasswordReset{
    constructor(private readonly repo: IUserRepository){}

    async execute(email: string){
        if (!email){
            return new Error('Missing mandatory param')
        }

        const user = await this.repo.findByEmail(email)

        if(!user){
            return new Error('User not found')
        } else {
            const timestamp = new Date().toString()
            const hash = createHash('sha256').update(email + timestamp)
            user.reset_token = hash.digest('hex')
            this.repo.save(user)
            return true
        }
    }
}