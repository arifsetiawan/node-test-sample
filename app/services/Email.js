'use strict';

const debug = require('debug')('app');
const config = require('../../config/' + (process.env.NODE_ENV || ''));

const path = require('path');
const fs = require('fs');

const nodemailer = require('nodemailer');
const htmlToText = require('nodemailer-html-to-text').htmlToText;

const fromEmail = 'NodeApp Team <no-reply@youremail.com>';

// setup transporter
const transporter = nodemailer.createTransport({
    service: config.emailer.service,
    auth: {
        user: config.emailer.user,
        pass: config.emailer.pass,
    },
});
transporter.use('compile', htmlToText());

// supported email templates
const emailTypes = {

    /*
      data: {
        firstName,
        lastName,
        verificationLink,
        email
      }

      template: {FIRSTNAME} {LASTNAME} {VERIFICATIONLINK}
    */
    emailVerification: {
        file: 'email_verification.html',
        subject: 'NodeApp email verification',
        replacer(body, data) {
            const emailBody = body.
            replace('{FIRSTNAME}', data.firstName).
            replace('{LASTNAME}', data.lastName).
            replace('{VERIFICATIONLINK}', data.verificationLink).
            replace('{VERIFICATIONLINK}', data.verificationLink);
            return emailBody;
        },
    },
};

module.exports = {

    send(type, data, cb) {

        // only process supported type
        const emailTypeData = emailTypes[type];

        if (emailTypeData) {

            const filePath = __dirname + '/emails/' + emailTypeData.file;
            fs.readFile(filePath, (err, emailBodyMd) => {
                if (err) {
                    console.error(err);
                } else {
                    let emailBody = emailBodyMd.toString();
                    emailBody = emailTypeData.replacer(emailBody, data);

                    const mailOptions = {
                        from: fromEmail,
                        to: data.email,
                        subject: emailTypeData.subject,
                        html: emailBody,
                    };

                    transporter.sendMail(mailOptions, (err, info) => {
                        if (err) {
                            debug(err);
                            cb(err);
                        } else {
                            debug(`Email with type ${type} is sent: ${info.response}`, JSON.stringify(data));
                            cb(null, info);
                        }
                    });
                }
            });

        } else {
            debug(`Email with type ${type} is not supported`);
        }

    },

};
