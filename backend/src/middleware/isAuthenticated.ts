import { JwtPayload, TokenExpiredError, verify } from "jsonwebtoken";
import { NextFunction } from "express";

export async function isAuthenticated(req: any, res: any, next: NextFunction){
    const { authorization } = req.headers;

    if(!authorization){ 
        return res.status(401).json({status:'error', message:'Unauthorized'})
    }
    
    const [,token] = authorization.split(" ");
    try{
        const isValid = verify(token, String(process.env.SECRET)) as JwtPayload;
        req.body.user_id = isValid._id;
    } catch(e){
        return res.status(401).json({status:'error', message: 'Token expired'})
    }

    next();
}