
const express = require('express');
const router = express.Router();

// Index
router.get('/', IndexController.index);

module.exports = router;
