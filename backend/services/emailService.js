const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'growlifyai@gmail.com',
    pass: 'dlgz gqqh dyyf jbsv' // 🔐 Your app password
  }
});

const sendEmail = async ({ to, subject, text }) => {
  if (!to || typeof to !== 'string') {
    console.error('❌ Cannot send email — recipient address is missing or invalid:', to);
    return;
  }

  const mailOptions = {
    from: 'growlifyai@gmail.com',
    to,
    subject,
    text
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent successfully to ${to}`);
  } catch (err) {
    console.error(`❌ Failed to send email to ${to}:`, err);
  }
};

module.exports = sendEmail;
