const express = require('express');
const router = express.Router();
const { signup, login, sendOTP, resetPassword } = require('../controllers/authController');

router.post('/signup', signup);
router.post('/login', login);
router.post('/send-otp', sendOTP);
router.post('/reset-password', resetPassword);

module.exports = router;
