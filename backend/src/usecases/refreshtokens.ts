import jwt from 'jsonwebtoken'
import { GenerateAccessJWT, GenerateRefreshJWT } from '../helpers/jwt-generators'

export class RefreshTokens{
    async execute(refreshToken: string){
        if(!refreshToken){
            return new Error('Missing mandatory param')
        }

        try{
            const valid = jwt.verify(refreshToken, String(process.env.JWT_SECRET))
            if(valid){
                const accessToken = GenerateAccessJWT({})
                const refreshToken = GenerateRefreshJWT({})
                return {accessToken, refreshToken}
            }
            return { }
        } catch(e){
            return new Error('Token invalid')
        }
    }
}