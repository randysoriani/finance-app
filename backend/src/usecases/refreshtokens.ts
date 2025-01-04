import jwt from 'jsonwebtoken'

export class RefreshTokens{
    async execute(refreshToken: string){
        if(!refreshToken){
            return new Error('Missing mandatory param')
        }

        try{
            const valid = jwt.verify(refreshToken, String(process.env.JWT_SECRET))
            if(valid){
                const accessToken = jwt.sign({}, String(process.env.JWT_SECRET), { expiresIn: 60 * 60 }) //1h
                const refreshToken = jwt.sign({}, String(process.env.JWT_SECRET), { expiresIn: 60 * 60 * 24 * 30 }) //30d
                return {accessToken, refreshToken}
            }
            return { }
        } catch(e){
            return new Error('Token invalid')
        }
    }
}