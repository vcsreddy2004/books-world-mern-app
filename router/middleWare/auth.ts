import express from "express";
import config from "../config";
import { IUser } from "../models/users/IUser";
import User from "../models/users/User";
import jwt from "jsonwebtoken";
const AuthLogin = async (req:express.Request,res:express.Response,next:express.NextFunction) => {
    try
    {
        let token = req.cookies["token"];
        if(!token)
        {
            let errorMessage = "Invalid token";
            res.clearCookie("token");
            return res.status(500).json({errorMessage});
        }
        if(config.SECRETE_KEY)
        {
            let payLoad: string | jwt.JwtPayload = await jwt.verify(token, config.SECRETE_KEY);
            if(typeof(payLoad) == "string")
            {
                let errorMessage = "Invalid token";
                res.clearCookie("token");
                return res.status(500).json({'errorMessage':errorMessage});
            }
            else
            {
                let user:IUser | null = await User.findOne({userName:payLoad.userName,email:payLoad.email}).select("-password");
                let currentDate = new Date();
                if(user)
                {
                    let loginLimit = new Date(user.lastLogIn);
                    loginLimit.setHours(loginLimit.getHours() + 4);
                    if (currentDate > loginLimit) 
                    {
                        let errorMessage = "token expired"
                        res.clearCookie("token");
                        return res.status(400).json({'errorMessage':errorMessage});
                    }
                    else
                    {
                        let userData = {
                            firstName:user.firstName,
                            lastName:user.lastName,
                            email:user.email,
                            userName:user.userName,
                            password:"",
                            errorMessage:"",
                            lastLogIn:user.lastLogIn,
                            token:""
                        }
                        req.body.user = userData;
                        next();
                    }
                }
                else
                {
                    let errorMessage = "Invalid token";
                    res.clearCookie("token");
                    return res.status(500).json({'errorMessage':errorMessage});
                }
            }
        }
        else
        {
            let errorMessage = "Environment variable error";
            res.clearCookie("token");
            return res.status(500).json({'errorMessage':errorMessage});
        }
    }
    catch(err)
    {
        console.error("AuthLogin Error:", err);
        res.clearCookie("token");
        return res.status(401).json({ errorMessage: "Unauthorized access" });
    }
}
export default AuthLogin;