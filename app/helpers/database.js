
'use strict';

const debug = require('debug')('app');
const config = require('../../config/' + (process.env.NODE_ENV || ''));

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var options = {
    server: { socketOptions: { keepAlive: 1 } },
};

mongoose.connect(config.mongodb.connectionUri, options);

mongoose.connection.on('connected', function() {
    debug('Mongoose default connection open to ' + config.mongodb.connectionUri);
});

mongoose.connection.on('error', function(err) {
    debug('Mongoose default connection error: ' + err);
});

mongoose.connection.on('disconnected', function() {
    debug('Mongoose default connection disconnected');
});

process.on('SIGINT', function() {
    mongoose.connection.close(function() {
        debug('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});

module.exports = mongoose;
