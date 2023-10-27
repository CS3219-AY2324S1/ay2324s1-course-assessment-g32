const express = require('express');
const router = express.Router();

const questionController = require('./QuestionController');
const middleware = require('./helpers/middleware');

// Only maintainer can access these routes
router.post('/create', middleware.checkTokenMaintainer, questionController.create);
router.put('/edit', middleware.checkTokenMaintainer, questionController.edit);
router.delete('/delete', middleware.checkTokenMaintainer, questionController.deleteQuestion);

// User and maintainer can access the remaining routes
router.get('/read-all', middleware.checkToken, questionController.getAll);
router.get('/read-all-by-complexity', middleware.checkToken, questionController.getAllByComplexity);
router.get('/read', middleware.checkToken, questionController.getQuestionDetails);
router.get('/read-random', middleware.checkToken, questionController.getRandomQuestionByCriteria);

module.exports = router;
