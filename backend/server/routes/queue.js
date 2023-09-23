const express = require('express');
const queueController = require('../controllers/queueController.js');

const router = express.Router();

router.post('/join', queueController.joinQueue);

module.exports = router;
