import mongoose from "mongoose";

// Define the schema for the registration/login
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String, // String is better than Number to handle leading zeros or '+'
    },
    address: {
        type: String,
    },
    donorType: {
        type: String,
        required: true,
        enum: ["Individual", "Restaurant", "Organization"], // Only these 3 options allowed
        default: "Individual"
    },
    password: {
        type: String,
        required: true // Changed to true since you need it for signup
    }
}, { timestamps: true, minimize: false });

// Create the model
const User = mongoose.model("User", userSchema);

export default User;