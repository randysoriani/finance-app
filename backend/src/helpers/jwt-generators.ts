import jwt from 'jsonwebtoken'

export function GenerateAccessJWT(payload: {}){
    return jwt.sign(payload, String(process.env.JWT_SECRET), { expiresIn: 60 * 60 })
}

export function GenerateRefreshJWT(payload: {}){
    return jwt.sign(payload, String(process.env.JWT_SECRET), { expiresIn: 60 * 60 * 24 * 30 })
}