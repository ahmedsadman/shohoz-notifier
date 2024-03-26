import nodemailer from 'nodemailer';

class Mailer {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: "smtp.postmarkapp.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.POSTMARK_API_KEY,
                pass: process.env.POSTMARK_API_KEY,
            },
        });
    }

    async send(to, subject, text) {
        const email = await this.transporter.sendMail({
            from: '"Muhib" <notify@muhib.me>',
            to,
            subject,
            text
        });
        return email.messageId;
    }
}

export default new Mailer();
