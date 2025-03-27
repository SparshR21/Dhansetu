const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    dob: { type: String, required: false },
    mobileNumber: { type: String, required: false },
    otp: { type: String }, // OTP field
    otpExpiry: { type: Date }, // OTP expiry time
    verified: { type: Boolean, default: false } // Verification status
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
module.exports = User;
