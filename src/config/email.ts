import nodemailer from 'nodemailer'
import 'dotenv/config';

interface ISendEmail {
    to: string;
    subject: string;
    body: string;
}

export const trasporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})

export const sendEmail = ({to, subject, body}: ISendEmail) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        html: body
    }

    trasporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error: ', error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    })
}