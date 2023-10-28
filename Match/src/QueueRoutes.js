const express = require('express');
const queueController = require('./QueueController');
const middleware = require('./helpers/middleware');

const router = express.Router();

router.post('/join', middleware.checkToken, queueController.joinQueue);
router.post('/exit', middleware.checkToken, queueController.exitQueue);

module.exports = router;
