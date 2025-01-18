import { AccountsRepositoryORM } from "../repositories/typeorm/accounts"
import { TransactionRepositoryORM } from "../repositories/typeorm/transactions"
import { CreateTransaction } from "../usecases/transactions/create-transaction"
import { GetLastTransactions } from "../usecases/transactions/getlasttransactions"

export class TransactionsController{
    static async create(req: any, res: any){
        const { account_id, type, amount, date, description } = req.body

        if(!account_id  || !type || !amount || !date){
            return res.status(400).json({status: 'error', message: 'Bad requisition'})
        }

        const accountRepository = new AccountsRepositoryORM()
        const repository = new TransactionRepositoryORM()

        const service = new CreateTransaction(repository, accountRepository)

        const response = await service.execute(
            account_id, description, type, amount, date
        )

        if(response instanceof Error){
            return res.status(500).json({status: 'error', message: 'Unable to create transaction'})
        } else {
            return res.status(201).json({
                status: 'ok', 
                message:'Transaction created', 
                payload: { 
                    response
                }
            })
        }
    }

    static async getLastTransactions(req: any, res: any){
        const { user_id } = req.body
        const transRepo = new TransactionRepositoryORM()
        const service = new GetLastTransactions(transRepo)
        const transactions = await service.execute(user_id)
        return res.json(transactions)
    }
}