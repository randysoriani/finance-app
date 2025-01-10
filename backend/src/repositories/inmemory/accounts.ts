import { Account } from "../../entity/account";
import { IAccountRepository } from "../account";

export class AccountRepositoryInMemory implements IAccountRepository{
    private accounts: Account[] = []

    async save(account: Account): Promise<boolean> {
        this.accounts.push(account)
        return true
    }

    async findById(id: string): Promise<Account | undefined> {
        const account = this.accounts.find(item => item.id === id)
        return account
    }

    async findAll(user_id: string): Promise<Account[] | undefined> {
        const accounts = this.accounts.filter(item => item.user_id === user_id)
        return accounts
    }
}