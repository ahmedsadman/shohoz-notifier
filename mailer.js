import nodemailer from 'nodemailer';
import fs from 'node:fs';

class Mailer {
    TIME_STORAGE_FILE = './timer.txt';
    TIME_THRESHOLD = Number(process.env.MIN_DELAY_THRESHOLD || 60000); // milliseconds

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

    async emitSend(to, subject, text) {
        const lastSentTime = +fs.readFileSync(this.TIME_STORAGE_FILE, { encoding: 'utf8' });
        
        if (Date.now() - lastSentTime < this.TIME_THRESHOLD) {
            console.log(`Email sent at: ${new Date(lastSentTime).toUTCString()}`);
            return;
        }
        const messageId = await this.send(to, subject, text);
        fs.writeFileSync(this.TIME_STORAGE_FILE, Date.now().toString());
        return messageId;
    }

    async send(to, subject, text) {
        const email = await this.transporter.sendMail({
            from: '"Muhib" <notify@muhib.me>',
            to,
            subject,
            text
        });
        console.log(`Email sent: ${email.messageId}`);
        return email.messageId;
    }
}

export default new Mailer();
