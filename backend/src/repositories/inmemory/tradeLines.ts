import { TradeLines } from "../../entity/investment"
import { ITradeLinesRepository } from "../tradeLines"

export class TradeLinesRepositoryInMemory implements ITradeLinesRepository{
    private tradeLines: TradeLines[] = []

    async save(tradeLine: TradeLines){
        return true
    }
}