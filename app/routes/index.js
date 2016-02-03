'use strict';

const debug = require('debug')('app');
const config = require('../../config/' + (process.env.NODE_ENV || ''));
const version = require('../../package.json').version;

const http = require('http');

module.exports = () => {

    // Craft response.
    function craft(data, message, status) {
        status = status || 200;

        const response = {
            meta: {
                code: status,
                message: message || http.STATUS_CODES[status],
            },
        };

        if (data != null) response.data = data;

        return response;
    };

    // Before routes
    app.use((req, res, next) => {
        req.locale = req.session.locale || config.i18n.defaultLocale;
        req.api = req.xhr || req.get('Accept').indexOf('html') < 0;

        // Base model only if request is not API.
        res.model = {
            user: req.user,
            locale: req.locale,
            version: version,
        };

        res.craft = craft;

        res.ok = (data, message, status) => {
            status = status || 200;
            res.status(status).send(craft(data, message, status));
        };

        next();
    });

    // routes
    app.use('/', require('./web'));
    app.use('/api/v1', require('./api'));
    app.use('/test', require('./test'));

    // 404 handler
    app.use((req, res, next) => {
        const err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // error handler
    app.use((err, req, res, next) => {
        const errSplitted = err.stack.split('\n');
        debug({
            message: errSplitted[0],
            location: errSplitted[1]
                        .replace(config.appDir, '')
                        .replace(/\\/g, '/')
                        .trim(),
            url: req.originalUrl,
        });

        if (err.message === 'Invalid login data') {
            req.logout();
            return res.redirect('/');
        }

        const status = err.status || 500;

        if (req.api) {
            return res.status(status).send(craft(err.data, err.message, status));
        } else {
            const model = Object.assign({}, res.model, craft(err.data, err.message, status));
            return res.render('errors/error', model);
        };

    });

};
