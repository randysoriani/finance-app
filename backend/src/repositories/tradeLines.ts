import { TradeLines } from "../entity/investment";

export interface ITradeLinesRepository{
    save(line: TradeLines): Promise<boolean>
}