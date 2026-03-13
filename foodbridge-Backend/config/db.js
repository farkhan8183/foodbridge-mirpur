import mongoose from "mongoose"
const connectDb = async () => {
//mongoose is used to connect with db
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("DB connected")
    } 
    catch (error) {
        console.log("DB error",error)
    }
}
export default connectDb