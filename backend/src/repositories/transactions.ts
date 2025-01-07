import { Transaction } from "../entity/transactions";

export interface ITransactionsRepository{
    save(transaction: Transaction): Promise<boolean>
    findAll(): Promise<Transaction[] | undefined>
    findById(id: string): Promise<Transaction | undefined>
}