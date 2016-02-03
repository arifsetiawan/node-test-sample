
'use strict';

const debug = require('debug')('app');
const config = require('../../config/' + (process.env.NODE_ENV || ''));

const Mongoose = require('mongoose');

var options = {
    server: { socketOptions: { keepAlive: 1 } },
};

Mongoose.connect(config.mongodb.connectionUri, options);

Mongoose.connection.on('connected', function() {
    debug('Mongoose default connection open to ' + config.mongodb.connectionUri);
});

Mongoose.connection.on('error', function(err) {
    debug('Mongoose default connection error: ' + err);
});

Mongoose.connection.on('disconnected', function() {
    debug('Mongoose default connection disconnected');
});

process.on('SIGINT', function() {
    Mongoose.connection.close(function() {
        debug('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});

module.exports = Mongoose;
