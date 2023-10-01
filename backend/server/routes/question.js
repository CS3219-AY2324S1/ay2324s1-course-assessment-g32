const express = require('express');
const router = express.Router();

const questionController = require('../../../backend/server/controllers/questionController.js');
const middleware = require('../middleware.js');

router.post('/create', middleware.checkTokenMaintainer, questionController.create);
router.get('/getAll', middleware.checkToken, questionController.getAll);
router.get(
  '/getQuestionDetails',
  middleware.checkToken,
  questionController.getQuestionDetails
);
router.post('/edit', middleware.checkTokenMaintainer, questionController.edit);
router.delete(
  '/delete',
  middleware.checkTokenMaintainer,
  questionController.deleteQuestion
);

module.exports = router;
