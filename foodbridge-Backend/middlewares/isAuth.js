import jwt from 'jsonwebtoken'


const isAuth = async (req,res,next) => {
    try {
        let {token} = req.cookies   //check if token exists in cookies n takes it
        
        if(!token){
            return res.status(400).json({message:"user does not have token"})
        }       
        let verifyToken = jwt.verify(token,process.env.JWT_SECRET)      //checks if token is not expired(takes token n its secret key)

        if(!verifyToken){
            return res.status(400).json({message:"user does not have a valid token"})
        }
        req.userId = verifyToken.userId //imp; stores userid from token into request body
        req.role = verifyToken.role //stores role from token into request body
        next()

    } catch (error) {
         console.log("isAuth error")
    return res.status(500).json({message:`isAuth error ${error}`})
        
    }
}

export default isAuth