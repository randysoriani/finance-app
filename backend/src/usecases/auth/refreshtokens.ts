import jwt, { JwtPayload } from 'jsonwebtoken'
import { GenerateAccessJWT, GenerateRefreshJWT } from '../../helpers/jwt-generators'

export class RefreshTokens{
    async execute(refreshToken: string){
        if(!refreshToken){
            return new Error('Missing mandatory param')
        }

        try{
            const valid = jwt.verify(refreshToken, String(process.env.JWT_SECRET)) as JwtPayload
            if(valid){
                if(valid.user_id){
                    const accessToken = GenerateAccessJWT({user_id: valid.user_id})
                    const refreshToken = GenerateRefreshJWT({user_id: valid.user_id})
                    return {accessToken, refreshToken}
                }
            }
            return { }
        } catch(e){
            return new Error('Token invalid')
        }
    }
}