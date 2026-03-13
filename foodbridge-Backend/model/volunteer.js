import mongoose from "mongoose";

// Define the schema for the registration/login
const volunteerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    cnic: {
        type: String,
    },
    city: {
        type: String,
    },
   vehicle: {
        type: String,
        required: true,
        enum: ["none", "bike", "car"], // Only these 3 options allowed
        default: "Individual"
    },
    password: {
        type: String,
        required: true // Changed to true since you need it for signup
    }
}, { timestamps: true, minimize: false });

// Create the model
const Volunteer = mongoose.model("Volunteer", volunteerSchema);

export default Volunteer;