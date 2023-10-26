const express = require('express');
const router = express.Router();

const questionController = require('./QuestionController');
const middleware = require('./helpers/middleware');

// Only maintainer can access these routes
router.post('/create', middleware.checkTokenMaintainer, questionController.create);
router.post('/edit', middleware.checkTokenMaintainer, questionController.edit);
router.delete('/delete', middleware.checkTokenMaintainer, questionController.deleteQuestion);

// User and maintainer can access the remaining routes
router.get('/getAll', middleware.checkToken, questionController.getAll);
router.get('/getAllByComplexity', middleware.checkToken, questionController.getAllByComplexity);
router.get('/getQuestionDetails', middleware.checkToken, questionController.getQuestionDetails);
router.get('/getRandomQuestionByCriteria', middleware.checkToken, questionController.getRandomQuestionByCriteria);

module.exports = router;
