import User from "../model/userModel.js"
import isAuth from "../middlewares/isAuth.js"
import Volunteer from "../model/volunteer.js"
import Recipient from "../model/recipient.js";
export const getCurrentUser = async (req,res) => {
    try {
        //it ll check if the userid given by token is available in db(it should be)
        if (req.role === 'donor') req.user = await User.findById(req.userId);
    if (req.role === 'recipient') req.user = await Recipient.findById(req.userId);
    if (req.role === 'volunteer') req.user = await Volunteer.findById(req.userId);

        
        if(!req.user){
           return res.status(404).json({message:"user is not found"}) 
        }
        return res.status(200).json(req.user)   //will return that user in response!
    } catch (error) { 
         console.log(error)
    return res.status(500).json({message:`getCurrentUser error ${error}`})
    }
}
