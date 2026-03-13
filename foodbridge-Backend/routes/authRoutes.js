import express, { Router } from 'express'
import { registration, volunteerlogin } from '../controllers/authController.js'
import { login } from '../controllers/authController.js'

export const authRoutes = express.Router()
import { logout } from '../controllers/authController.js'
import { volunteerRegistration } from '../controllers/authController.js'
import {recipientRegistration,recipientlogin,recipientlogout} from '../controllers/authController.js'
import { volunteerlogout } from '../controllers/authController.js'

authRoutes.post("/registration",registration)   //if user request is post n endpoint is /registration,direct to registration controller in authcontoller
authRoutes.post("/login",login)
authRoutes.get("/logout",logout)
//for volunteer:
authRoutes.post("/volunteer/registration",volunteerRegistration)   //if user request is post n endpoint is /registration,direct to registration controller in authcontoller
authRoutes.post("/volunteer/login",volunteerlogin)
authRoutes.get("/volunteer/logout",volunteerlogout)
//for recipient:
authRoutes.post("/recipient/registration",recipientRegistration)
authRoutes.post("/recipient/login",recipientlogin)
authRoutes.get("/recipient/logout",recipientlogout)