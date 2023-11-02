const express = require('express');
const router = express.Router();

const chatbotController = require('./ChatbotController');

router.post('/get-response', chatbotController.getResponse);

module.exports = router;
