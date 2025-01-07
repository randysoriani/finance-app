import { Transaction } from "../../entity/transactions";
import { ITransactionsRepository } from "../transactions";

export class TransactionRepositoryInMemory implements ITransactionsRepository{
    private transactions: Transaction[] = []

    async save(transaction: Transaction): Promise<boolean> {
        this.transactions.push(transaction)
        return true
    }

}