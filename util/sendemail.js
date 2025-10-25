import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,          // secure port
  secure: true,       // true for 465
  auth: {
    user: process.env.PASS_MAIL,
    pass: process.env.GOOGLE_APP_PASSWORD,
  },
});

// Optional: verify connection before sending
transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP connection failed:", error);
  } else {
    console.log("✅ SMTP server is ready to send emails");
  }
});
