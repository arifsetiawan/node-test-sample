'use strict';

const debug = require('debug')('app');
const Async = require('../services/Async');

require('../models/todo');

const mongoose = require('mongoose');
const Todo = mongoose.model('Todo');

module.exports = {

    post: Async.route(function *(req, res, next) {
        const todo = new Todo({
            task: req.body.task,
        });

        const doc = yield todo.save();
        res.ok(doc, 'New todo', 201);
    }),

    /*
    post(req, res, next) {

        const todo = new Todo({
            task: req.body.task,
        });

        todo.save().then(function(doc) {
            res.ok(doc, 'New todo', 201);
        })
        .catch((err)=> {
            return next(err);
        });
    },
    */

    list: Async.route(function *(req, res, next) {

        const todos = yield Todo.find({}).exec();
        res.ok(todos, 'Todos');
    }),

};

