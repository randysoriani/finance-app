import { Trades } from "../../entity/investment"
import { ITradesRepository } from "../trades"

export class TradeRepositoryInMemory implements ITradesRepository{
    private trades: Trades[] = []

    async save(trade: Trades){
        const newTrade = {}
        this.trades.push()
        return true
    }
}