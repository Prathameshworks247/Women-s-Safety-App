import jwt from 'jsonwebtoken';

import { JWT_SECRET } from '../config';

export const authMiddleware=async (req,res,next)=>{
    try{
        const token=req.headers.authorization.split(' ')[1];
        const string=req.headers.authorization.split(' ')[0];

        if(string!=='Bearer'){
            return res.status(401).json({
                msg:'Not authorized'
            });
        }

        const isAuth=jwt.verify(token,JWT_SECRET);

        if(!isAuth.success){
            return res.status(401).json({
                msg:'Not authorized'
            });
        }

        next();
    } catch(err){
        return res.status(500).json({
            msg:'Something went wrong!'
        });
    }
}