const express = require('express');
const router = express.Router();

const historyController = require('./HistoryController.js');
// const middleware = require('./helpers/middleware.js');

// No middleware function
router.post('/attempts', historyController.addAttempt);
router.delete('/attempts', historyController.deleteUserAttempts);
router.get('/attempts', historyController.getAttempts);
router.get('/heatmap', historyController.getHeatMapData);
router.get('/piechart', historyController.getPieChartData);
router.get('/attempt', historyController.getAttempt);

module.exports = router;
