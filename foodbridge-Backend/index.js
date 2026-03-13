import express from "express"
import cookieParser from "cookie-parser";
import cors from 'cors'
import connectDb from "./config/db.js";
import dotenv from 'dotenv'
import { authRoutes } from "./routes/authRoutes.js";
dotenv.config();//its used to read .env file and set environment variables
import userRoutes from "./routes/userRoutes.js";

let app=express();//stores express app
let port=process.env.PORT || 6000

//on get request
app.get("/",(req,res)=>{    
res.send({message: "hi from server!"}) //sends response to client!
})

//middlewares
app.use(express.json()) //will just convert incoming data into json
app.use(cookieParser()) //a cookie parser
//cors required for security!
app.use(cors({
 origin:["http://localhost:5173" , "http://localhost:5174"],
 credentials:true
}))
app.use("/api/auth",authRoutes) //if route is /api/auth,direct to authRoutes!
app.use("/api/user",userRoutes) //if route is /api/user,direct to userRoutes!


//listens on this port!

app.listen(port,()=>{
    console.log("Hello From Server")
    connectDb()
})
