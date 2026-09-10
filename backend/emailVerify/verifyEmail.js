
import "dotenv/config";
import transporter from "./mailer.js";


export const verifyEmail = async (token, email) => {
    console.log("🔥 verifyEmail CALLED");
    console.log("📧 Recipient:", email);

    try {
        const verificationLink =
            `${process.env.CLIENT_URL}/verify/${token}`;

        console.log("🔗 Verification link:", verificationLink);

        const mailConfigurations = {
            from: `"Zeptronics" <${process.env.MAIL_USER}>`,

            to: email,

            subject: "Verify Your Zeptronics Email",

            text: `
You have recently registered on Zeptronics.

Please verify your email by clicking this link:

${verificationLink}

This verification link will expire in 10 minutes.

If you did not create this account, you can ignore this email.
            `,

            html: `
                <div style="
                    font-family: Arial, sans-serif;
                    max-width: 600px;
                    margin: auto;
                    padding: 20px;
                ">

                    <h2>Email Verification</h2>

                    <p>Hi!</p>

                    <p>
                        You have recently registered on Zeptronics.
                    </p>

                    <p>
                        Please click the button below to verify your email:
                    </p>

                    <a
                        href="${verificationLink}"
                        style="
                            display: inline-block;
                            padding: 12px 24px;
                            background: #007bff;
                            color: white;
                            text-decoration: none;
                            border-radius: 5px;
                        "
                    >
                        Verify Email
                    </a>

                    <p style="margin-top: 20px;">
                        This verification link will expire in 10 minutes.
                    </p>

                    <p>
                        If you did not create this account,
                        you can safely ignore this email.
                    </p>

                    <p>Thanks!</p>

                    <p>
                        <strong>Zeptronics Team</strong>
                    </p>

                </div>
            `,
        };

        const info = await transporter.sendMail(mailConfigurations);

        console.log("✅ Verification email sent:", info.messageId);

        return {
            success: true,
            messageId: info.messageId,
        };

    } catch (error) {

        console.error("❌ EMAIL ERROR:", error);

        return {
            success: false,
            error: error.message,
        };
    }
};