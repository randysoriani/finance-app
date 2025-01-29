import { appDataSource } from "..";
import { Trades } from "../../entity/investment";
import { TradesModel } from "../models/trades";
import { ITradesRepository } from "../trades";

export class TradesRepositoryORM implements ITradesRepository{
    private repository = appDataSource.getRepository(TradesModel)

    async save(trade: Trades): Promise<boolean> {
        const response = await this.repository.save(trade)

        if(response){
            return true
        }

        return false
    }
}
