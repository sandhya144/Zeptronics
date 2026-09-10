
import "dotenv/config";
import transporter from "./mailer.js";

export const sendOTPMail = async (otp, email) => {
    try {

        const mailConfigurations = {
            from: `"Zeptronics" <${process.env.MAIL_USER}>`,

            to: email,

            subject: "Password Reset OTP",

            html: `
                <h2>Password Reset</h2>

                <p>Your OTP for password reset is:</p>

                <h1>${otp}</h1>

                <p>
                    Please use this OTP to reset your password.
                </p>

                <p>
                    If you did not request a password reset,
                    you can ignore this email.
                </p>
            `,
        };

        const info = await transporter.sendMail(mailConfigurations);

        console.log("✅ OTP email sent:", info.messageId);

        return {
            success: true,
            messageId: info.messageId,
        };

    } catch (error) {

        console.error("❌ OTP email failed:", error);

        return {
            success: false,
            error: error.message,
        };
    }
};