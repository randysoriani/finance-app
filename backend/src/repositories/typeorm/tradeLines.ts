import { appDataSource } from "..";
import { TradeLines } from "../../entity/investment";
import { TradeLinesModel } from "../models/tradeLines";
import { ITradeLinesRepository } from "../tradeLines";

export class TradeLinesRepositoryORM implements ITradeLinesRepository{
    private repository = appDataSource.getRepository(TradeLinesModel)
    
    async save(tradeLine: TradeLines){
        const response = await this.repository.save(tradeLine)
        if(response){
            return true
        }

        return false
    }
}