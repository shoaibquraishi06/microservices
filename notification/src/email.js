
const nodemailer = require("nodemailer");

// ONLY FOR LOCAL DEV (fixes antivirus SSL interception issues)
// ❗ Remove in production
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// Create Gmail transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,   // Gmail address
    pass: process.env.EMAIL_PASS    // 16-digit App Password
  }
});

// Verify SMTP connection
transporter.verify((err, success) => {
  if (err) {
    console.error("❌ SMTP Connection Error:", err);
  } else {
    console.log("✅ Gmail SMTP is Ready");
  }
});

// Universal Email Function
const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Shoaib" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html
    });

    console.log("📨 Email Sent!");
    console.log("Message ID:", info.messageId);
  } catch (error) {
    console.error("❌ Email Sending Failed:", error);
  }
};

module.exports = { sendEmail };

// TEST (remove in production)

