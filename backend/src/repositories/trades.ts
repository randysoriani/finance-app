import { Trades } from "../entity/investment"

export interface ITradesRepository{
    save(trade: Trades): Promise<boolean>
    // findAll(): Promise<Trades[] | undefined>
    // findById(id: string): Promise<Trades | undefined>
}