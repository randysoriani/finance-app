import { AccountsRepositoryORM } from "../repositories/typeorm/accounts"
import { TradeLinesRepositoryORM } from "../repositories/typeorm/tradeLines"
import { TradesRepositoryORM } from "../repositories/typeorm/trades"
import { CreateTrade } from "../usecases/trades/create-trade"

export class TradesController{
    static async create(req: any, res: any){
        console.log(req.body)
        const { account_id, doc_number, tax_b3, tax_perquisite, tax_register, date, lines  } = req.body

        if(!account_id  || !doc_number || !lines || !date){
            return res.status(400).json({status: 'error', message: 'Bad requisition'})
        }

        const tradeRepository = new TradesRepositoryORM()
        const tradeLinesRepository = new TradeLinesRepositoryORM()
        const accountRepository = new AccountsRepositoryORM()

        const service = new CreateTrade(tradeRepository, tradeLinesRepository, accountRepository)

        const response = await service.execute({account_id, doc_number, tax_b3, tax_perquisite, tax_register, date, lines})

        if(response instanceof Error){
            return res.status(500).json({status: 'error', message: 'Unable to create trade'})
        } else {
            return res.status(201).json({
                status: 'ok', 
                message:'Trade created', 
                payload: { 
                    response
                }
            })
        }
    }
}