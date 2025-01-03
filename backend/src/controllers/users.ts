import { UserRepositoryORM } from "../repositories/typeorm/users";
import { CreateUser } from "../usecases/createuser";

export class UsersController{
    static async create(req: any, res: any){
        const { email, password} = req.body

        if(!email || !password){
            return res.status(400).json({status: 'error', message: 'Bad requisition'})
        }

        const repository = new UserRepositoryORM()
        const createUser = new CreateUser(repository)

        const exists = await repository.findByEmail(email)
        if(exists){
            return res.status(400).json({status: 'error', message: 'Email already in use'})
        }

        const result = await createUser.execute(email, password)

        if(result){
            return res.status(201).json({
                status: 'ok', 
                message:'User created', 
                payload: { 
                    id: result.id, 
                    accessToken: result.accessToken, 
                    refreshToken: result.refreshToken
                }
            })
        }

        return res.status(500).json({status: 'error', message: 'Unable to create new user'})
    }
}