import nodemailer from 'nodemailer';
import 'dotenv/config';

export const sendOTPMail = async (otp, email) => {
    console.log("MAIL_USER:", process.env.MAIL_USER);
    console.log("MAIL_PASS:", process.env.MAIL_PASS?.length);
    const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    }
});

const mailConfigurations = {

    // It should be a string of sender/server email
    from: process.env.MAIL_USER,
    to: email,
    subject: 'Password Reset OTP',
    html: `<p>Your OTP for password reset is: <b>${otp}</b></p>`
};

// transporter.sendMail(mailConfigurations, function(error, info){
//     if (error) throw Error(error);
//     console.log('Email Sent Successfully');
//     console.log(info);
// });

transporter.sendMail(mailConfigurations, function(error, info){
    if (error) {
        console.log(error);
        return;
    }
    console.log('OTP Sent Successfully');
});

}
