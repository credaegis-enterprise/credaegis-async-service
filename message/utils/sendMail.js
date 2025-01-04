const nodeMailer = require('nodemailer');
require('dotenv').config();

const sendMail = async (email, subject, html) => {



    console.log(process.env.CREDAEGIS_EMAIL);
    console.log(process.env.CREDAEGIS_EMAIL_PASSWORD);
    const transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.CREDAEGIS_EMAIL,
            pass: process.env.CREDAEGIS_EMAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.CREDAEGIS_EMAIL,
        to: email,
        subject: subject,
        html: html
    }

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`Email sent: ${info.response}`);
    } catch (error) {
        console.error(error);
    }
}


module.exports = sendMail;