import jwt from 'jsonwebtoken'

export function GenerateAccessJWT(payload: {}){
    return jwt.sign(payload, String(process.env.JWT_SECRET), { expiresIn: '1h' })
}

export function GenerateRefreshJWT(payload: {}){
    return jwt.sign(payload, String(process.env.JWT_SECRET), { expiresIn: '30d' })
}