import { appDataSource } from "..";
import { Account } from "../../entity/account";
import { IAccountRepository } from "../account";
import { AccountsModel } from "../models/account";

export class AccountsRepositoryORM implements IAccountRepository{
    async save(account: Account): Promise<boolean> {
        const repository = appDataSource.getRepository(AccountsModel)
        const response = await repository.save(account)
        if(response){
            return true
        }
        return false
    }
}