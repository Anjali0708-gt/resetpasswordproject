// util/sendemail.js
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const sendEmail = async (to, subject, text, html) => {
  try {
    // 🔹 Create transporter inside the function (recommended)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.PASS_MAIL,
        pass: process.env.GOOGLE_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"Auth Project" <${process.env.PASS_MAIL}>`,
      to,
      subject,
      text,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully:", info.response);
    return info;
  } catch (error) {
    console.error("❌ Error sending email:", error.message);
    throw error;
  }
};
