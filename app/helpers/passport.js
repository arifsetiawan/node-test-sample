'use strict';

const passport = require('passport');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findOneById(id).exec((err, user) => {
        if (user) {
            delete user.password;
            done(null, user);
        } else {
            done(new Error('Invalid login data'));
        }
    });
});
