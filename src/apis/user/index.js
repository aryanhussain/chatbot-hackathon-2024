const express = require('express');
const router = express.Router();
const Controller = require('./Controller');

router.get('/list', Controller.getList);

module.exports = router;