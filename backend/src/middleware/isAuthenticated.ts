import { JwtPayload, verify } from "jsonwebtoken";
import { NextFunction } from "express";

export async function isAuthenticated(req: any, res: any, next: NextFunction){
    const { authorization } = req.headers;

    if(!authorization){ 
        return res.status(401).json({status:'error', message:'Unauthorized'})
    }
    
    const [,token] = authorization.split(" ");
    try{
        const isValid = verify(token, String(process.env.SECRET)) as JwtPayload;
        if(!isValid.user_id){
            return res.status(401).json({status:'error', message: 'User not authorized'})
        }
        req.body.user_id = isValid.user_id;
        
    } catch(e){
        return res.status(401).json({status:'error', message: 'Token expired'})
    }

    next();
}