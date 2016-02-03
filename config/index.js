
const path = require('path');

module.exports = {

    port: process.env.PORT || 8000,
    hostname: 'localhost',
    get fullHostname() {
        return `${this.hostname}:${this.port}`;
    },

    // database
    mongodb: {
        host: 'localhost',
        port: '27017',
        dbname: 'nodedev',
        username: '',
        password: '',
        get connectionUri() {
            return `mongodb://${this.host}:${this.port}/${this.dbname}`;
        },
    },

    // dir
    appDir: path.join(__dirname, '..'),
    uploadDir: path.join(__dirname, '..', '/assets/upload'),
    logDir: path.join(__dirname, '../logs/dev/'),

    // locale
    i18n: {
        defaultLocale: 'en_US',
    },

    // swig
    swig: {
        cache: false,
    },

    // nodemailer
    emailer: {
        service: 'emailService',
        user: 'username',
        pass: 'password',
    },

    cookie: {
        secret: 'thisisnotsecret',
    },
};
