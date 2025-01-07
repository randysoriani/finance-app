import { appDataSource } from "..";
import { Transaction } from "../../entity/transactions";
import { TransactionsModel } from "../models/transactions";
import { ITransactionsRepository } from "../transactions";

export class TransactionRepositoryORM implements ITransactionsRepository{
    async save(transaction: Transaction): Promise<boolean> {
        const repository = appDataSource.getRepository(TransactionsModel)
        const response = await repository.save(transaction)
        if(response){
            return true
        }

        return false
    }

}