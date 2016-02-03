'use strict';

// node modules
const path = require('path');
const debug = require('debug')('app');

const express = require('express');
const swig = require('swig');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const i18n = require('i18n');
const MongoStore = require('connect-mongo')(session);
const config = require('./config/' + (process.env.NODE_ENV || ''));
const Mongoose = require('./app/helpers/database');

// i18n
i18n.configure({
    locales: ['en_US', 'id'],
    directory: __dirname + '/app/locales',
    updateFiles: false,
});

// express setup
global.app = express();

// view engine setup
swig.setDefaults(config.swig);
app.engine('swig', swig.renderFile);
app.set('views', __dirname + '/app/views');
app.set('view engine', 'swig');

app.disable('x-powered-by');
if (process.env.NODE_ENV === 'development')
    app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// initialize
app.use(session({
    name: 'nodeapp.sess',
    resave: false,
    saveUninitialized: false,
    secret: config.cookie.secret,
    autoReconnect: true,
    maxAge: new Date(Date.now() + 3600000),
    store: new MongoStore({
        mongooseConnection: Mongoose.connection,
        collection: 'app_sessions',
    }),
}));

app.use(express.static(__dirname + '/assets'));
app.use(express.static(__dirname + '/bower_components'));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(i18n.init);

// routes
require('./app/routes')();

const port = config.port;
const server = app.listen(port, () => {
    debug('NodeApp server listening on port ' + port + ' with env ' + process.env.NODE_ENV);
});

// ups
process.on('uncaughtException', err => {
    debug('uncaughtException', err.stack);
    process.exit();
});

module.exports = app;
