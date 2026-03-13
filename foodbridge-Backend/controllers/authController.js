import User from "../model/userModel.js";
import Volunteer from "../model/volunteer.js";
import bcrypt from "bcryptjs"
import validator from "validator" //Install it using:npm install validator
import { genToken, genToken2, genToken3 } from "../config/token.js";
import Recipient from "../model/recipient.js";

//here we r creating a new user:
export const registration = async (req,res) => {
  try {
    console.log("Registration request body:", req.body);  // Log incoming data for debugging
    const {name , email, password,address,phoneNumber,donorType} = req.body;  //accept data entered by user stored in req.body
    //check requirements!
    const existUser = await User.findOne({email}) //checks if user with email already exists in db/model
    if(existUser){
        return res.status(400).json({message:"User already exist"})
    }
    if(!validator.isEmail(email)){  //validates email; requires its packages!
         return res.status(400).json({message:"Enter valid Email"})
    }
    if(password.length < 8){
        return res.status(400).json({message:"Enter Strong Password"})
    }
    let hashPassword = await bcrypt.hash(password,10) //use bcrypt to hash password for security

  //Finally after checking requiremnts,make a new document/user in our User model with given details!
    const user = await User.create({name,email,address,phoneNumber,donorType,password:hashPassword}) //(password used is hashed one)

  //Now, whenever a new user is added,it is assign with a token i.e ID card that it can make it authorized user!
    let token = await genToken(user._id) //sends id of a new user to gentoken fucntion in config folder where our token ll be genereated
    res.cookie("token",token,{  //after token is gesnreatred,we ll simple parse/store it in cookie
        httpOnly:true,
        secure:false,
        sameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000 //expires in 7 days
    })
    return res.status(201).json(user)
  } catch (error) {
    console.log("registration error")
    return res.status(500).json({message:`registration error ${error}`})
  }
    
}
//controller for login
export const login = async (req,res) => { 
    try {
        let {email,password} = req.body;  //takes email n password from user
      //perform action on both
        let user = await User.findOne({email})  //checks email in db
        if(!user){
            return res.status(404).json({message:"User is not Found"})
        }
        let isMatch = await bcrypt.compare(password,user.password) //if user is there compare its password with password entered by user via bcrypt!
        if(!isMatch){
            return res.status(400).json({message:"Incorrect password"}) 
        }
        //same like signup/registraiton; genreates token n parse it to cookie
        let token = await genToken(user._id)
        res.cookie("token",token,{
        httpOnly:true,
        secure:false,
        sameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
    })
    return res.status(201).json(user)

    }
     catch (error) {
         console.log("login error")
    return res.status(500).json({message:`Login error ${error}`})
        
    }
    
}

//controller for logout:
export const logout = async (req,res) => {
try {
    res.clearCookie("token")  //clears the cookie named token; that ll ofc clear any login/signup too!
    return res.status(200).json({message:"logOut successful"})
} catch (error) {
    console.log("logOut error")
    return res.status(500).json({message:`LogOut error ${error}`})
}
    
}

//for voulnteer, we can use same controllers as above but with different endpoints in routes file; so that we can differentiate between donor and volunteer!
//here we r creating a new user:
export const volunteerRegistration = async (req,res) => {
  try {
    const { name,email,password,city,cnic,vehicle} = req.body;  //accept data entered by user stored in req.body
    //check requirements!
    const existUser = await Volunteer.findOne({email}) //checks if user with email already exists in db/model
    if(existUser){
        return res.status(400).json({message:"User already exist"})
    }
    if(!validator.isEmail(email)){  //validates email; requires its packages!
         return res.status(400).json({message:"Enter valid Email"})
    }
    if(password.length < 8){
        return res.status(400).json({message:"Enter Strong Password"})
    }
    let hashPassword = await bcrypt.hash(password,10) //use bcrypt to hash password for security

  //Finally after checking requiremnts,make a new document/user in our User model with given details!
    const user = await Volunteer.create({ name,email,password:hashPassword,city,cnic,vehicle}) //(password used is hashed one)

  //Now, whenever a new user is added,it is assign with a token i.e ID card that it can make it authorized user!
    let token = await genToken2(user._id) //sends id of a new user to gentoken fucntion in config folder where our token ll be genereated
    res.cookie("token",token,{  //after token is genreatred,we ll simple parse/store it in cookie
        httpOnly:true,
        secure:false,
        sameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000 //expires in 7 days
    })
    return res.status(201).json(user)
  } catch (error) {
    console.log("registration error",error)
    return res.status(500).json({message:`registration error ${error}`})
  }
    
}

//controller for login
export const volunteerlogin = async (req,res) => { 
    try {
        let {email,password} = req.body;  //takes email n password from user
      //perform action on both
        let user = await Volunteer.findOne({email})  //checks email in db
        if(!user){
            return res.status(404).json({message:"User is not Found"})
        }
        let isMatch = await bcrypt.compare(password,user.password) //if user is there compare its password with password entered by user via bcrypt!
        if(!isMatch){
            return res.status(400).json({message:"Incorrect password",isMatch}) 
        }
        //same like signup/registraiton; genreates token n parse it to cookie
        let token = await genToken2(user._id)
        res.cookie("token",token,{
        httpOnly:true,
        secure:false,
        sameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
    })
    return res.status(201).json(user)

    }
     catch (error) {
         console.log("login error")
    return res.status(500).json({message:`Login error ${error}`})
        
    }
    
}

//controller for logout:
export const volunteerlogout = async (req,res) => {
try {
    res.clearCookie("token")  //clears the cookie named token; that ll ofc clear any login/signup too!
    return res.status(200).json({message:"logOut successful"})
} catch (error) {
    console.log("logOut error")
    return res.status(500).json({message:`LogOut error ${error}`})
}
    
}

//for recipient:


export const recipientRegistration = async (req,res) => {
  try {
    const {name , email, password} = req.body;  //accept data entered by user stored in req.body
    //check requirements!
    const existUser = await Recipient.findOne({email}) //checks if user with email already exists in db/model
    if(existUser){
        return res.status(400).json({message:"User already exist"})
    }
    if(!validator.isEmail(email)){  //validates email; requires its packages!
         return res.status(400).json({message:"Enter valid Email"})
    }
    if(password.length < 8){
        return res.status(400).json({message:"Enter Strong Password"})
    }
    let hashPassword = await bcrypt.hash(password,10) //use bcrypt to hash password for security

  //Finally after checking requiremnts,make a new document/user in our User model with given details!
    const user = await Recipient.create({name,email,password:hashPassword}) //(password used is hashed one)

  //Now, whenever a new user is added,it is assign with a token i.e ID card that it can make it authorized user!
    let token = await genToken3(user._id) //sends id of a new user to gentoken fucntion in config folder where our token ll be genereated
    res.cookie("token",token,{  //after token is genreatred,we ll simple parse/store it in cookie
        httpOnly:true,
        secure:false,
        sameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000 //expires in 7 days
    })
    return res.status(201).json(user)
  } catch (error) {
    console.log("registration error")
    return res.status(500).json({message:`registration error ${error}`})
  }
    
}
//controller for login
export const recipientlogin = async (req,res) => { 
    try {
        let {email,password} = req.body;  //takes email n password from user
      //perform action on both
        let user = await Recipient.findOne({email})  //checks email in db
        if(!user){
            return res.status(404).json({message:"User is not Found"})
        }
        let isMatch = await bcrypt.compare(password,user.password) //if user is there compare its password with password entered by user via bcrypt!
        if(!isMatch){
            return res.status(400).json({message:"Incorrect password"}) 
        }
        //same like signup/registraiton; genreates token n parse it to cookie
        let token = await genToken3(user._id)
        res.cookie("token",token,{
        httpOnly:true,
        secure:false,
        sameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
    })
    return res.status(201).json(user)

    }
     catch (error) {
         console.log("login error")
    return res.status(500).json({message:`Login error ${error}`})
        
    }
    
}

//controller for logout:
export const recipientlogout = async (req,res) => {
try {
    res.clearCookie("token")  //clears the cookie named token; that ll ofc clear any login/signup too!
    return res.status(200).json({message:"logOut successful"})
} catch (error) {
    console.log("logOut error")
    return res.status(500).json({message:`LogOut error ${error}`})
}
    
}
