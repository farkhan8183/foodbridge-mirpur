import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { getCurrentUser } from "../controllers/userController.js";

let userRoutes=express.Router()

userRoutes.get("/getcurrentuser",isAuth,getCurrentUser) //on this endpoint first of all,go to middleware i.e isAuth to get user id of current user n then heads to getcurrent user controller/funtion

export default userRoutes