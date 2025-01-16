const axios = require('axios');

const sendOtp = async (mobileNumber) => {
    try {
        const response = await axios.get(
            `https://2factor.in/API/V1/${process.env.API_KEY}/SMS/${mobileNumber}/AUTOGEN`
        );
        return response.data;
    } catch (error) {
        console.error('Error sending OTP:', error.message);
        throw new Error('Failed to send OTP');
    }
};

const verifyOtp = async (sessionId, otp) => {
    try {
        const response = await axios.get(
            `https://2factor.in/API/V1/${process.env.API_KEY}/SMS/VERIFY/${sessionId}/${otp}`
        );
        return response.data;
    } catch (error) {
        console.error('Error verifying OTP:', error.message);
        throw new Error('Failed to verify OTP');
    }
};

module.exports = { sendOtp, verifyOtp };
