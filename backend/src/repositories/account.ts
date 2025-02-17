import { Account } from "../entity/account";

export interface IAccountRepository{
    save(account: Account): Promise<boolean>
    findById(id: string): Promise<Account | undefined>
    findAll(user_id: string): Promise<Account[] | undefined>
}