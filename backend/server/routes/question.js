const express = require('express');
const router = express.Router();

const questionController = require('../../../backend/server/controllers/questionController.js');
const middleware = require('../middleware.js');

router.post('/create', middleware.checkToken, questionController.create);
router.get('/getAll', middleware.checkToken, questionController.getAll);
router.get(
  '/getQuestionDetails',
  middleware.checkToken,
  questionController.getQuestionDetails
);
router.post('/edit', middleware.checkToken, questionController.edit);
router.delete(
  '/delete',
  middleware.checkToken,
  questionController.deleteQuestion
);

module.exports = router;
