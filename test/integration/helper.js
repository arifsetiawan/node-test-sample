'use strict';

const debug = require('debug')('test');
const config = require('../../config/' + (process.env.NODE_ENV || ''));

const Mongoose = require('mongoose');

before(function(done) {

    function clearDB() {
        for (var i in Mongoose.connection.collections) {
            Mongoose.connection.collections[i].remove();
        };

        return done();
    }

    var options = {
        server: { socketOptions: { keepAlive: 1 } },
    };

    Mongoose.connect(config.mongodb.connectionUri, options);

    Mongoose.connection.on('connected', function() {
        debug('Reset mongo database');
        clearDB();
    });
});
