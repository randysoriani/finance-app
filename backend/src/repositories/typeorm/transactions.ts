import { appDataSource } from "..";
import { Transaction } from "../../entity/transactions";
import { TransactionsModel } from "../models/transactions";
import { ITransactionsRepository } from "../transactions";

export class TransactionRepositoryORM implements ITransactionsRepository{
    private repository = appDataSource.getRepository(TransactionsModel)

    async save(transaction: Transaction): Promise<boolean> {
        const response = await this.repository.save(transaction)
        if(response){
            return true
        }

        return false
    }

    async findAll(): Promise<Transaction[] | undefined> {
        const transactions = await this.repository.find()
        return transactions
    }

    async findById(id: string): Promise<Transaction | undefined> {
        const transaction = await this.repository.findOneBy({id})
        if(transaction){
            return transaction
        }

        return
    }

    async getLastWithAccounts(user_id: string){
        const response = await appDataSource.getRepository(TransactionsModel)
                                            .createQueryBuilder('transactions')
                                            .leftJoinAndSelect('transactions.account', 'accounts')
                                            .where('accounts.user_id = :id', {id: user_id})
                                            .orderBy('transactions.date', 'DESC')
                                            .limit(10)
                                            .getMany()

        return response
    }
}

