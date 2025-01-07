import { Transaction } from "../entity/transactions";

export interface ITransactionsRepository{
    save(transaction: Transaction): Promise<boolean>
}