'use strict';

const { Service } = require('@hapipal/schmervice');
const mailer = require('nodemailer');

module.exports = class MailService extends Service {

    async generateTransporter() {
        // generated ethereal testing account
        const testAccount = await mailer.createTestAccount();

        return mailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
                user: testAccount.user,
                pass: testAccount.pass
            }
        });
    }

    async sendMail(to, subject, text, html) {
        const transporter = await this.generateTransporter();
        const from = 'noreply@maximecapel.com';
        const mail = await transporter.sendMail({
            from,
            to,
            subject,
            text,
            html
        });

        console.log('Message sent: %s', mail.messageId);
        console.log('Preview URL: %s', mailer.getTestMessageUrl(mail));
    }

    async sendEmailWithAttachment(recipient, subject, text, csvData) {
        const transporter = await this.generateTransporter();
        const from = 'noreply@maximecapel.com';
        const mail = await transporter.sendMail({
            from,
            to: recipient,
            subject,
            text,
            attachments: [
                {
                    filename: 'movies.csv',
                    content: csvData
                }
            ]
        });
        console.log('Message sent: %s', mail.messageId);
        console.log('Preview URL: %s', mailer.getTestMessageUrl(mail));
    }
};
