import { UserRepositoryORM } from "../repositories/typeorm/users"
import { AuthUser, BadRequest } from "../usecases/authuser"

export class AuthController{
    static async create(req: any, res: any){
        const { email, password} = req.body

        if(!email || !password){
            return res.status(400).json({status: 'error', message: 'Bad requisition'})
        }

        const repository = new UserRepositoryORM()
        const service = new AuthUser(repository)
        const response = await service.execute(email, password)

        if(response instanceof BadRequest ){
            return res.status(response.status).json({status: 'error', message: response.message})
        } else {
            return res.status(200).json({status: 'ok', message: 'Auth ok', payload: {
                id: response.id, 
                accessToken: response.accessToken, 
                refreshToken: response.refreshToken
            }})
        }
    }
}