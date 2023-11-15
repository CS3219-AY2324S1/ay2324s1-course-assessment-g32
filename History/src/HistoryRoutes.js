const express = require('express');
const router = express.Router();
const historyController = require('./HistoryController');
const middleware = require('./helpers/middleware');

router.get('/piechart', middleware.checkToken, historyController.getPieChartData);
router.get('/heatmap', middleware.checkToken, historyController.getHeatMapData);
router.get('/attempts', middleware.checkToken, historyController.getAttempts);
router.get('/attempt', middleware.checkToken, historyController.getAttempt);
router.post('/attempt', middleware.checkToken, historyController.addAttempt);

module.exports = router;
