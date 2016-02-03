'use strict';

exports.isAuthenticated = role => {

    return (req, res, next) => {

        if (!req.isAuthenticated()) {
            req.session.returnTo = req.url;
            res.redirect('/signin');
            return;
        }

        if (role && _.intersection(role, req.user.role).length === 0) {
            const err = new Error('Not allowed');
            err.status = 401;
            next(err);
        }

        next();
    };
};
