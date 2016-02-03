'use strict';

const debug = require('debug')('app');

let data = [];

module.exports = {

    post(req, res, next) {
        data.push(req.body);
        res.ok(req.body, 'New todo', 201);
    },

    list(req, res, next) {
        res.ok(data, 'Todos');
    },
};

