const express = require('express');
const queueController = require('../controllers/queueController.js');

const router = express.Router();

router.post('/join', queueController.joinQueue);
router.post('/exit', queueController.exitQueue);

module.exports = router;
