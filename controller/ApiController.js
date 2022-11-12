import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";
import User from "../models/User.js";
import argon2 from "argon2"
import RedisClient from "../cache/redis.js";

export const Login =  async (req, res) => {
    const {email, password} = req.body;
    try {

        const user = await User.findOne({email:email});
        if(!user){return res.status(404).json({msg: "email not found"});}
        const verivyPass = await argon2.verify(user.password, password);

        if(!verivyPass){return res.status(404).json({msg: "username or password incorrect"});}
        const accessToken =  jwt.sign({id:user.uuid}, process.env.JWT_ACCESS_TOKEN, {expiresIn:60});
        const refreshToken =  jwt.sign({id:user.uuid}, process.env.JWT_REFRESH_SECRET, {expiresIn:3600});

        await RedisClient.get(user.uuid.toString(), (err, data) => {
            if(err) throw new err;

            RedisClient.set(user.uuid.toString(), JSON.stringify({
                token:refreshToken
            }));
        })

        return res.status(200).json({accessToken, refreshToken})
        
    } catch (error) {
        return res.status(401).json({message:"Error", message:error});

    }
}

export const Register = async (req, res) => {

    const {email, password} = req.body;
    const id = nanoid(24);
    const hasPassword = await argon2.hash(password);

    const users = new User({
        uuid:id,
        email,
        password:hasPassword
    });
    
    try {
        const saved = await users.save();
        if(saved){
            return res.status(201).json({
                message:"user has been saved successfully",
                data:saved
            });
        }
    } catch (error) {
        return res.status(400).json({
            message:"Something went wrong!",
            data:error
        });
    }


}

export const Logout = async (req, res) =>{
    const id = req.user.id;
    const token = req.token;
    
    try {

        await RedisClient.del(id.toString());
        await RedisClient.set('BL_' + id.toString(), token);

        return res.status(200).json({message:"success logout"})
        
    } catch (error) {
        return res.status(401).json({
            message:"UnAuthorized!",
            data:error
        })
    }

}



export const GetData = (req, res) => {
     res.status(200).json({
        message:"success"
     })
}

export const Token =  (req, res) =>{

    const id = req.user.id;
    const accessToken =  jwt.sign({id:id}, process.env.JWT_ACCESS_TOKEN, {expiresIn:60});
    const refreshToken =  jwt.sign({id:id}, process.env.JWT_REFRESH_SECRET, {expiresIn:3600});

    RedisClient.get(id.toString(), (err, data) => {
        if(err) throw new err;

        RedisClient.set(id.toString(), JSON.stringify({
            token:refreshToken
        }));
    })


    return res.status(200).json({
        message:"success",
        accessToken,
        refreshToken
    })
}

