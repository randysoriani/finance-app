import { ITransactionsRepository } from "../../repositories/transactions";

export class GetLastTransactions{
    constructor(private readonly repository: ITransactionsRepository){}

    async execute(user_id: string){
        if(!user_id){
            return new Error('Missing used id')
        } else {
            const transactions = await this.repository.getLastWithAccounts(user_id)
            return {transactions}
        }
    }
}