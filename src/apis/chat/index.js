const express = require('express');
const router = express.Router();
const chatController = require('./chatController');

router.get('/', chatController.processMessage);

module.exports = router;