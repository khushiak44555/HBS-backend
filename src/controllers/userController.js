const User = require('../models/userModel');
const { sendOtp, verifyOtp } = require('../utils/otpService');

let otpSessionId = null;

// Step 1: Send OTP
const sendOtpController = async (req, res) => {
    const { mobileNumber } = req.body;
    try {
        const user = await User.findOne({ mobileNumber });
        if (!user) {
            await User.create({ mobileNumber });
        }
        const response = await sendOtp(mobileNumber);
        otpSessionId = response.Details;
        res.status(200).json({ message: 'OTP sent successfully', sessionId: otpSessionId });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Step 2: Verify OTP
const verifyOtpController = async (req, res) => {
    const { otp, mobileNumber } = req.body;
    try {
        const verificationResponse = await verifyOtp(otpSessionId, otp);
        if (verificationResponse.Status === 'Success') {
            const user = await User.findOneAndUpdate(
                { mobileNumber },
                { isVerified: true },
                { new: true }
            );
            res.status(200).json({ message: 'OTP verified successfully', user });
        } else {
            res.status(400).json({ message: 'Invalid OTP' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Step 3: Collect and Save User Details
const saveUserDetailsController = async (req, res) => {
    const { mobileNumber, fullName, email, gender, age, bloodGroup } = req.body;
    try {
        const user = await User.findOneAndUpdate(
            { mobileNumber },
            { fullName, email, gender, age, bloodGroup },
            { new: true }
        );
        if (user && user.isVerified) {
            res.status(200).json({ message: 'User details saved successfully', user });
        } else {
            res.status(400).json({ message: 'User not verified or not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { sendOtpController, verifyOtpController, saveUserDetailsController };
