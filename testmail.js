import { sendEmail } from "./util/sendemail.js";

sendEmail(
  "anj13062004@gmail.com",
  "Test Email",
  "Testing Gmail SMTP",
  "<h1>Hello, this is a test!</h1>"
)
  .then(() => console.log("✅ Test email sent"))
  .catch(err => console.error("❌ Test email failed:", err));
