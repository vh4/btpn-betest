import jwt from "jsonwebtoken";
import RedisClient from "../cache/redis.js";

export const verifyToken = (req, res, next) => {
    try {

        // Bearer 543k5j34kl5j43l54lk5jkl45j54kl5 (token)
        const token = req.headers.authorization.split(' ')[1];
        const docoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN)
        req.user = docoded;

        req.token = token;
        RedisClient.get('BL_' + docoded.id.toString(), (err, data) => {
            if(err) throw err;

            if(data === token) return res.status(401).json({status: false, message: "blacklisted token."});
            next();
        })        
        next();

    } catch (error) {
        return res.status(401).json({message:"Unauthorization!", data:error});
    }
}


export const verifyRefreshToken = async (req, res, next) => {

    const token = req.body.token;

    if(token === null){
        return res.status(401).json({message:"invalid request refresh token!"});
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        req.user = decoded;

        RedisClient.get(decoded.id.toString(), (err, data) => {
            if (err) console.log(err);
            if(data === null) {return res.status(401).json({message:"invalid request refresh token! Token is not Store!"})};
            if(JSON.parse(data).token != token){return res.status(401).json({message:"invalid request refresh token! Token is not Same!"});}

            next();
        });

    } catch (error) {
        return res.status(401).json({message:"Unauthorization!", data:error});
    }
}

