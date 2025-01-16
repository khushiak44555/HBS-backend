const express = require('express');
const {
    sendOtpController,
    verifyOtpController,
    saveUserDetailsController,
} = require('../controllers/userController');

const router = express.Router();

router.post('/send-otp', sendOtpController);
router.post('/verify-otp', verifyOtpController);
router.post('/save-details', saveUserDetailsController);

module.exports = router;
