const nodemailer = require('nodemailer');

class MailService {

    constructor(){
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            },
            tls: {
                ciphers:'SSLv3'
            }
        })
    }

    async sendActivationMail(to, link) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to, 
            subject: 'Активація акаунту на ' + process.env.API_URL,
            text: '',
            html: 
                `
                    <div>
                        <h1>Для активації акаунту перейдіть по посиланню</h1>
                        <a href="${link}">${link}</a>
                    </div>
                `
        })
    }
}

module.exports = new MailService(); 