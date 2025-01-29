import { nanoid } from "nanoid";
import { Trades, TradeLines } from "../../entity/investment";
import { ITradeLinesRepository } from "../../repositories/tradeLines";
import { ITradesRepository } from "../../repositories/trades";
import { IAccountRepository } from "../../repositories/account";
import { NewTradeDTO } from "../../dto/trades";

export class CreateTrade{
    constructor(private readonly repository: ITradesRepository, 
                private readonly linesRepository: ITradeLinesRepository, 
                private readonly accountRepository: IAccountRepository){}

    async execute(trade: NewTradeDTO){

        const account = await this.accountRepository.findById(trade.account_id)
        if(!account){
            return new Error('Account not found')
        }

        const trade_id = nanoid()
        const newTrade: Trades = {
            id: trade_id, 
            account_id: account,
            doc_number: trade.doc_number,
            tax_b3: trade.tax_b3,
            tax_register: trade.tax_register,
            tax_perquisite: trade.tax_perquisite,
            date: trade.date
        }
        const tradeResponse = await this.repository.save(newTrade)

        if(tradeResponse){
            trade.lines.forEach(async (element) => {
                const line: TradeLines = {
                    ...element,
                    id: nanoid(), 
                    trade_id: newTrade.id
                }
                await this.linesRepository.save(line)
            });
            return true
        }
        return new Error('Impossible to create new trade')
    }
}