import mongoose from "mongoose";

//for model,we need schema:
const userSchema = new mongoose.Schema({    //mongoose creates schema
    //properties of user:
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String
    }
},{timestamps:true , minimize:false})

//now, mongoose creates model
const Recipient = mongoose.model("Recipient",userSchema) 

export default Recipient