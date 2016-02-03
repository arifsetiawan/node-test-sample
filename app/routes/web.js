
const express = require('express');
const router = express.Router();

const IndexController = require('../controllers/IndexController');

// Index
router.get('/', IndexController.index);

module.exports = router;
