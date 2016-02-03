
const path = require('path');
const _ = require('lodash');

module.exports = _.merge(require('./'), {

    // database
    mongodb: {
        dbname: 'nodetest',
    },

    logDir: path.join(__dirname, '../logs/test/'),

});
