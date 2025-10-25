import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Create transporter
export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465, // secure port
  secure: true,
  auth: {
    user: process.env.PASS_MAIL, // your Gmail
    pass: process.env.GOOGLE_APP_PASSWORD, // app password
  },
});

// Verify connection
transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP connection failed:", error);
  } else {
    console.log(" SMTP server is ready to send emails");
  }
});

// Named export
export const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.PASS_MAIL,
      to,
      subject,
      text,
      html,
    });
    console.log("✅ Email sent:", info.messageId);
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
};
