import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
    }
})

async function sendMail(to, subject, text, html){
    // console.log("sending mail to: ", to);
    
    try {
        const info = await transporter.sendMail({
            from: process.env.EMAIL,
            to,
            subject,
            text,
            html,
        })

        return {success: true, messageId: info.messageId};
    } catch (error) {
        console.log("Mail Error:", error);
        return {success: false, error: error.message};
    }
}

export default sendMail;