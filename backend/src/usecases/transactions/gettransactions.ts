import { ITransactionsRepository } from "../../repositories/transactions";

export class GetTransactions{
    constructor(private readonly repository: ITransactionsRepository){}

    async execute(id?: string){
        if(id){
            const transaction = await this.repository.findById(id)
            return {transaction}
        } else {
            const transactions = await this.repository.findAll()
            return {transactions}
        }
    }
}