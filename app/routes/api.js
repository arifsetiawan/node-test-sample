'use strict';

const express = require('express');
const router = express.Router();

const TodoController = require('../controllers/TodoController');

router.get('/', (req, res, next) => {
    res.ok('Node API. Maybe');
});

router.post('/todos', TodoController.post);
router.get('/todos', TodoController.list);

module.exports = router;
