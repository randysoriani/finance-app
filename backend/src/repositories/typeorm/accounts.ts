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

    async findById(id: string): Promise<Account | undefined> {
        const repository = appDataSource.getRepository(AccountsModel)
        const response = await repository.findOneBy({id})
        return response ? response : undefined
    }

    async findAll(user_id: string): Promise<Account[] | undefined> {
        const repository = appDataSource.getRepository(AccountsModel)
        const response = await repository.findBy({user_id})
        return response
    }
}