import { AccountsRepositoryORM } from "../repositories/typeorm/accounts"
import { InstitutionsRepositoryORM } from "../repositories/typeorm/institutions"
import { UserRepositoryORM } from "../repositories/typeorm/users"
import { CreateAccount } from "../usecases/accounts/createaccount"
import { GetAccounts } from "../usecases/accounts/getaccounts"

export class AccountsController{
    static async create(req: any, res: any){
        const { name, description, agency, account, user_id, institution_id } = req.body

        if(!name || !agency || !account || !user_id || !institution_id){
            return res.status(400).json({status: 'error', message: 'Bad requisition'})
        }

        const repository = new AccountsRepositoryORM()
        const userRepository = new UserRepositoryORM()
        const instRepository = new InstitutionsRepositoryORM()

        const service = new CreateAccount(repository, userRepository, instRepository)

        const response = await service.execute(
            name, agency, account, user_id, institution_id, description
        )

        if(response instanceof Error){
            return res.status(500).json({status: 'error', message: 'Unable to create account'})
        } else {
            return res.status(201).json({
                status: 'ok', 
                message:'Account created', 
                payload: { 
                    response
                }
            })
        }
    }

    static async get(req: any, res: any){
        const { id } = req.params
        const { user_id } = req.body

        const repository = new AccountsRepositoryORM()
        const service = new GetAccounts(repository)

        const response = await service.execute(user_id, id)
        return res.json(response)
    }
}