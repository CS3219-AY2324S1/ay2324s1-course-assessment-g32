const express = require('express');
const router = express.Router();

const questionController = require('../../../backend/server/controllers/questionController.js');
const middleware = require('../middleware.js');

// Only maintainer can access these routes
router.post(
  '/create',
  middleware.checkTokenMaintainer,
  questionController.create
);
router.put('/edit', middleware.checkTokenMaintainer, questionController.edit);
router.delete(
  '/delete',
  middleware.checkTokenMaintainer,
  questionController.deleteQuestion
);

// User and maintainer can access the remaining routes
router.get('/read-all', middleware.checkToken, questionController.getAll);
router.get(
  '/read',
  middleware.checkToken,
  questionController.getQuestionDetails
);

module.exports = router;
