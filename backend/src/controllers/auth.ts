import { UserRepositoryORM } from "../repositories/typeorm/users"
import { AuthUser, BadRequest } from "../usecases/authuser"
import { RefreshTokens } from "../usecases/refreshtokens"

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

    static async refreshToken(req: any, res: any){
        const oldRefreshToken = req.body.refreshToken

        if(!oldRefreshToken){
            return res.status(400).json({status: 'error', message: 'Bad requisition'})
        }

        const service = new RefreshTokens()
        const result = await service.execute(oldRefreshToken)
        if(result instanceof Error){
            return res.status(400).json({status: 'error', message: 'Invalid token'})
        } else {
            if(result.accessToken && result.refreshToken){
                return res.json({
                    status: 'ok', 
                    message:'Tokens refreshed', 
                    payload: { 
                        accessToken: result.accessToken,
                        refreshToken: result.refreshToken
                    }
                }
            )}
        }
        return res.status(500).json({status: 'error', message: 'Server error'})
    }
}