const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const plantRoutes = require('./routes/plantRoutes');
require('./schedulers/cronJobs'); // ⏰ Loads all scheduled tasks
const nodemailer = require('nodemailer');

const app = express();
connectDB(); // ✅ Connect to MongoDB

app.use(cors());
app.use(express.json({ limit: '10mb' })); // ✅ Handles large payloads

// Routes
app.use('/api', authRoutes);             // /api/signup, /api/login, etc.
app.use('/api/plants', plantRoutes);     // /api/plants/add, etc.

// ✉ Contact Form Email Route
const EMAIL_USER = 'growlifyai@gmail.com';
const EMAIL_PASS = 'dlgz gqqh dyyf jbsv';
const RECEIVER_EMAIL = 'growlifyai@gmail.com';

app.post('/contact', async (req, res) => {
  const { fullName, emailAddress, message } = req.body;

  if (!fullName || !emailAddress || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"${fullName}" <${emailAddress}>`,
      to: RECEIVER_EMAIL,
      subject:` 🌱 New Contact Form Submission from ${fullName}`,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${emailAddress}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (err) {
    console.error('Email sending failed:', err);
    res.status(500).json({ message: 'Failed to send message' });
  }
});

// Server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🌿 Growlify backend running on http://localhost:${PORT}`);
});
