import { nanoid } from "nanoid";
import { IAccountRepository } from "../../repositories/account";
import { ITransactionsRepository } from "../../repositories/transactions";

export class CreateTransaction{
    constructor(private readonly repository: ITransactionsRepository, private readonly accountRepository: IAccountRepository){}

    async execute(account_id: string, desc: string, type: string, amount: number, date: Date){
        if(!account_id || !type || !amount || !date){
            return new Error('Missing mandatory params')
        }

        const account = await this.accountRepository.findById(account_id)
        if(!account){
            return new Error('Account not found')
        }
        
        const transaction = {
            id: nanoid(),
            account_id,
            description: desc,
            type, 
            amount,
            date
        }

        const response = await this.repository.save(transaction)
        if(response){
            return transaction
        }

        return new Error('Unable to create transaction')
    }
}