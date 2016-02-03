
const _ = require('lodash');

module.exports = _.merge(require('./'), {

    // database
    mongodb: {
        host: '192.168.0.2',
        port: '12345',
        dbname: 'nodeprod',
        username: 'user',
        password: 'pass',
        get connectionUri() {
            return `mongodb://${this.username}:${this.password}@${this.host}:${this.port}/${this.dbname}`;
        },
    },

    // most likely should change this
    logDir: '/var/log/app',

    // swig
    swig: {
        cache: 'memory',
    },

    // nodemailer
    emailer: {
        service: 'emailService',
        user: 'username',
        pass: 'password',
    },

    cookie: {
        secret: 'somesecretthatyoushouldkeep',
    },
});
