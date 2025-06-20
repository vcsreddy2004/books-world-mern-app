import express from "express";
import config from "./config";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "./router/userRouter";
import cookieParser from "cookie-parser";
import reviewRouter from "./router/reviewsRouter";
import BookRouter from "./router/BooksRouter";
let app:express.Application = express();
app.use(cookieParser());
app.use(cors({
  origin: ["http://localhost:3000","http://127.0.0.1:3000"],  
  credentials: true              
}));
app.use(express.json());
app.use("/api/user",userRouter);
app.use("/api/reviews",reviewRouter);
app.use("/api/books",BookRouter);
if(config.MONGO_DB_URL)
{
    mongoose.connect(config.MONGO_DB_URL).then((res)=>{
        console.log("mongo Db connected");
    }).catch((err)=>{
        console.log(err);
    });
}
app.get("/",(req:express.Request,res:express.Response)=>{
    return res.status(200).json({
        "msg":"Express servver is running"
    });
});
if(config.PORT)
{
    app.listen(Number(config.PORT),()=>{
        console.log(`Server has started`); 
    });
}