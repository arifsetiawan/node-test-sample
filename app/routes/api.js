'use strict';

const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.ok('Node API. Maybe');
});

module.exports = router;
