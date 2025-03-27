const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
require("dotenv").config();

const router = express.Router();

// Configure Nodemailer
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL, // Your email
        pass: process.env.EMAIL_PASSWORD, // Your app password
    },
});

// Signup Route with OTP Generation
router.post("/signup", async (req, res) => {
    try {
        const { fullName, email, password, mobileNumber, dob } = req.body;

        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "User already exists" });

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate OTP
        const otp = crypto.randomInt(100000, 999999).toString(); // 6-digit OTP
        const otpExpiry = Date.now() + 5 * 60 * 1000; // OTP valid for 5 minutes

        // Create new user (unverified)
        user = new User({ 
            fullName, 
            email, 
            password: hashedPassword, 
            mobileNumber, 
            dob, 
            otp, 
            otpExpiry, 
            verified: false 
        });

        await user.save();

        // Send OTP via email
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "Verify Your Account - OTP",
            text: `Your OTP for verification is: ${otp}. It expires in 5 minutes.`,
        };

        await transporter.sendMail(mailOptions);

        res.status(201).json({ message: "OTP sent to your email. Please verify to continue." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// OTP Verification Route
router.post("/verify-otp", async (req, res) => {
    try {
        const { email, otp } = req.body;

        // Find user
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found" });

        // Check OTP validity
        if (user.otp !== otp || user.otpExpiry < Date.now()) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }

        // Mark user as verified
        user.verified = true;
        user.otp = null;
        user.otpExpiry = null;
        await user.save();

        res.status(200).json({ message: "OTP verified successfully. You can now log in." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Login Route (Only Verified Users)
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user
        let user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        // Check if user is verified
        if (!user.verified) return res.status(400).json({ message: "Please verify your OTP before logging in" });

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ token, userId: user._id, name: user.fullName, email: user.email });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;

