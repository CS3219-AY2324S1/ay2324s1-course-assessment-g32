const express = require('express');
const router = express.Router();

const questionController = require('./QuestionController');
const middleware = require('./helpers/middleware');

// Only maintainer can access these routes
router.post('/', middleware.checkTokenMaintainer, questionController.create);
router.put('/', middleware.checkTokenMaintainer, questionController.edit);
router.delete('/', middleware.checkTokenMaintainer, questionController.deleteQuestion);

// User and maintainer can access the remaining routes
router.get('/', middleware.checkToken, questionController.getQuestionDetails);
router.get('/all', middleware.checkToken, questionController.getAll);
router.get('/by-criteria', middleware.checkToken, questionController.getAllByCriteria);
router.get('/random', middleware.checkToken, questionController.getRandomQuestionByCriteria);
router.post('/append-question-title', middleware.checkToken, questionController.appendQuestionTitle);
router.post('/count-by-difficulty', middleware.checkToken, questionController.getQuestionDifficultyCount);
router.get('/statistics', middleware.checkToken, questionController.getQuestionStatistics);

module.exports = router;
