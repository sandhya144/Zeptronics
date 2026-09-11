import nodemailer from "nodemailer";
import "dotenv/config";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,

    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },

    connectionTimeout: 20000,
    greetingTimeout: 20000,
    socketTimeout: 30000,
});

transporter.verify((error, success) => {
    if (error) {
        console.log("❌ SMTP ERROR:", error);
    } else {
        console.log("✅ SMTP SERVER READY:", success);
    }
});

export default transporter;