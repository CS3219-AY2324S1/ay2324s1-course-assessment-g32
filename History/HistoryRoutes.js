const express = require('express');
const router = express.Router();

const historyController = require('./HistoryController.js');
// const middleware = require('./helpers/middleware.js');

// No middleware function
router.post('/attempts', historyController.addAttempt);
router.delete('/attempts', historyController.deleteUserAttempts);
router.get('/attempts', historyController.getAttempts);

module.exports = router;
