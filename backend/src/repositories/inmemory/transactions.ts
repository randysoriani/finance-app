import { Transaction } from "../../entity/transactions";
import { ITransactionsRepository } from "../transactions";

export class TransactionRepositoryInMemory implements ITransactionsRepository{
    private transactions: Transaction[] = []

    async save(transaction: Transaction): Promise<boolean> {
        this.transactions.push(transaction)
        return true
    }

    async findAll(): Promise<Transaction[] | undefined> {
        return this.transactions
    }

    async findById(id: string): Promise<Transaction | undefined> {
        const transaction = this.transactions.find(item => item.id === id)
        return transaction
    }

    async getLastWithAccounts(user_id: string): Promise<Transaction[] | undefined> {
        throw new Error("Method not implemented.");
    }
}