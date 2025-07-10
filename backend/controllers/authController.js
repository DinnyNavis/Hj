const Signup = require('../models/Signup');
const Login = require('../models/Login');
const sendEmail = require('../services/emailService');

let otpStore = {}; // In-memory OTP store

exports.signup = async (req, res) => {
    const { name, email, password, city, otp } = req.body;

    // OTP validation
    if (otpStore[email] !== otp) {
        return res.status(400).json({ message: 'Invalid OTP' });
    }

    try {
        // Create new user
        await Signup.create({ name, email, password, city });
        delete otpStore[email];

        res.json({ message: 'Signup successful' });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ message: 'Signup failed' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Signup.findOne({ email, password });

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        await Login.create({ email });

        // Use user._id as token (simplified auth)
        res.json({ token: user._id.toString(), user });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Login failed' });
    }
};

exports.sendOTP = async (req, res) => {
    const { email } = req.body;

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore[email] = otp;

    const mailOptions = {
        to: email,
        subject: 'Growlify Email Verification OTP',
        text: `Your 6-digit OTP is: ${otp}`
    };

    try {
        await sendEmail(mailOptions);
        res.json({ message: 'OTP sent' });
    } catch (error) {
        console.error('Send OTP error:', error);
        res.status(500).json({ message: 'Failed to send OTP' });
    }
};

exports.resetPassword = async (req, res) => {
    const { email, newPassword, otp } = req.body;

    if (otpStore[email] !== otp) {
        return res.status(400).json({ message: 'Invalid OTP' });
    }

    try {
        await Signup.updateOne({ email }, { password: newPassword });
        delete otpStore[email];

        res.json({ message: 'Password reset successful' });
    } catch (error) {
        console.error('Reset password error:', error);
        res.status(500).json({ message: 'Password reset failed' });
    }
};
