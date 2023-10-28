const express = require('express');
const router = express.Router();
const historyController = require('./HistoryController');
const middleware = require('./helpers/middleware');

router.post('/attempts', middleware.checkToken, historyController.addAttempt);
router.get('/attempts', middleware.checkToken, historyController.getAttempts);
router.get('/heatmap', middleware.checkToken, historyController.getHeatMapData);
router.get('/piechart', middleware.checkToken, historyController.getPieChartData);
router.get('/attempt', middleware.checkToken, historyController.getAttempt);

module.exports = router;
