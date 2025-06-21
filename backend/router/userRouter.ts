import express from "express";
import { UserView } from "../models/users/userView";
import User from "../models/users/User";
import { IUser } from "../models/users/IUser";
import bcrypt from "bcryptjs";
import config from "../config";
import AuthLogin from "../middleWare/auth";
import jwt from "jsonwebtoken";
const userRouter:express.Router = express.Router();
userRouter.post("/register",async(req:express.Request,res:express.Response)=>{
    try
    {
        let userData:UserView = {
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            email:req.body.email,
            userName:req.body.userName,
            password:req.body.password,
            token:"",
            lastLogIn:null,
            isAdmin:req.body.isAdmin || false,
            errorMessage:""
        }
        let user:IUser | null = await User.findOne({ $or: [{userName:userData.userName},{email:userData.email}]});
        if(user)
        {
            userData = {} as UserView;
            userData.errorMessage = "user name or email already exist";
            return res.status(400).json(userData);
        }
        else if(userData.userName == userData.password)
        {
            userData = {} as UserView;
            userData.errorMessage = "user name and password is same";
            return res.status(401).json(userData);
        }
        else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email))
        {
            userData = {} as UserView;
            userData.errorMessage = "invalid email id";
            return res.status(401).json(userData);         
        }
        else
        {
            const salt:string = await bcrypt.genSalt(10);
            userData.password = await bcrypt.hash(userData.password,salt);
            user = new User(userData);
            user.save();
            return res.status(200).json(userData);
        }
    }
    catch(err)
    {
        return res.status(500).json(err);
    }
});
userRouter.post("/login",async(req:express.Request,res:express.Response)=>{
    try
    {
        let userData:UserView = {
            firstName:"",
            lastName:"",
            email:"",
            userName:req.body.userName,
            password:req.body.password,
            token:"",
            lastLogIn:null,
            isAdmin:false,
            errorMessage:""
        }
        let user:IUser | null = await User.findOne({userName:userData.userName});
        if(user)
        {
            if(await bcrypt.compare(userData.password,user.password))
            {
                const currentDate = new Date();
                if(user.lastLogIn)
                {
                    const loginLimit = new Date(user.lastLogIn);
                    loginLimit.setHours(loginLimit.getHours() + 4);
                    if (currentDate > loginLimit) 
                    {
                        const payLoad = {
                            email:user.email,
                            userName:user.userName
                        }
                        userData = {} as UserView;
                        if(config.SECRETE_KEY)
                        {
                            await User.findOneAndUpdate({userName:user.userName},{lastLogIn:new Date()},{ new: true } );
                            const token = await jwt.sign(payLoad,config.SECRETE_KEY)
                            userData.errorMessage = "";
                            res.cookie("token",token,{httpOnly:true,sameSite:"lax",secure:false});
                            return res.status(200).json(userData);
                        }
                        else
                        {   
                            userData = {} as UserView;
                            userData.errorMessage = "Environment variable error";
                            return res.status(500).json(userData);
                        }
                    }
                    userData.errorMessage = "Login after 4 hours"
                    return res.status(400).json(userData);
                    
                }
                else
                {
                    const payLoad = {
                        email:user.email,
                        userName:user.userName
                    }
                    userData = {} as UserView;
                    if(config.SECRETE_KEY)
                    {
                        await User.findOneAndUpdate({userName:user.userName},{lastLogIn:new Date()},{ new: true } );
                        const token = await jwt.sign(payLoad,config.SECRETE_KEY)
                        res.cookie("token",token,{httpOnly:true,sameSite:"lax",secure:false});
                        return res.status(200).json(userData);
                    }
                    else
                    {
                        userData = {} as UserView;
                        userData.errorMessage = "Environment variable error";
                        return res.status(500).json(userData);
                    }
                }
            }
            else
            {
                userData = {} as UserView;
                userData.errorMessage = "Invalid password";
                return res.status(401).json(userData);
            }
        }
        else
        {
            userData = {} as UserView;
            userData.errorMessage = "user name dose not exist";
            return res.status(400).json(userData);
        }
    }
    catch(err)
    {
        return res.status(500).json(err);
    }
});
userRouter.post("/logout",AuthLogin,async(req:express.Request,res:express.Response)=>{
    res.clearCookie("token");
    return res.status(200).json({"success":"log out success"})
});
userRouter.post("/get-user-data",AuthLogin,async(req:express.Request,res:express.Response)=>{
    try
    {
        const userData:UserView = {
            firstName:req.body.user.firstName,
            lastName:req.body.user.lastName,
            email:req.body.user.email,
            userName:req.body.user.userName,
            password:"",
            token:"",
            lastLogIn:req.body.user.lastLogIn,
            isAdmin:req.body.user.isAdmin,
            errorMessage:""
        }
        return res.status(200).json(userData);
    }
    catch(err)
    {
        return res.status(401).json(err);
    }
});
export default userRouter;