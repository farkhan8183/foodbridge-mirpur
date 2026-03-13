import jwt from "jsonwebtoken"
//for donor:
export const genToken = async (userId) => { //recieves id of new user for which token is to be created
   try {
    let token = await jwt.sign({userId, role: 'donor'} , process.env.JWT_SECRET , {expiresIn:"7d"}) //jwt is used to create token,it takes id, secret key(random) and expiry of token
    return token
   } catch (error) {
     console.log("token error")
   }
}
//for volunteer
export const genToken2 = async (userId) => { //recieves id of new user for which token is to be created
   try {
    let token = await jwt.sign({userId, role: 'volunteer'} , process.env.JWT_SECRET , {expiresIn:"7d"}) //jwt is used to create token,it takes id, secret key(random) and expiry of token
    return token
   } catch (error) {
     console.log("token error")
   }
}
//for recipient
export const genToken3 = async (userId) => { //recieves id of new user for which token is to be created
   try {
    let token = await jwt.sign({userId, role: 'recipient'} , process.env.JWT_SECRET , {expiresIn:"7d"}) //jwt is used to create token,it takes id, secret key(random) and expiry of token
    return token
   } catch (error) {
     console.log("token error")
   }
}