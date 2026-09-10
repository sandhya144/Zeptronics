import transporter from "./mailer.js";
import "dotenv/config";


console.log("MAIL_USER:", process.env.MAIL_USER);
console.log("MAIL_PASS exists:", !!process.env.MAIL_PASS);
console.log("MAIL_PASS length:", process.env.MAIL_PASS?.length);

const testEmail = async () => {
    try {
        const info = await transporter.sendMail({
            from: `"Zeptronics" <${process.env.MAIL_USER}>`,
            to: "sndy6363@gmail.com",
            subject: "Zeptronics Nodemailer Test",

            text: "Nodemailer is working successfully!",

            html: `
                <h2>Nodemailer is working 🎉</h2>
                <p>This is a test email from Zeptronics.</p>
            `,
        });

        console.log("✅ Email sent successfully");
        console.log("Message ID:", info.messageId);

    } catch (error) {
        console.error("❌ Email sending failed");
        console.error(error);
    }
};

testEmail();