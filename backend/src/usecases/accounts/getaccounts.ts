import { IAccountRepository } from "../../repositories/account";

export class GetAccounts{
    constructor(private readonly repository: IAccountRepository){}

    async execute(user_id: string, account_id?: string){
        if(account_id){
            const account = await this.repository.findById(account_id)
            return {account}
        } else {
            const accounts = await this.repository.findAll(user_id)
            return {accounts}
        }
    }
}