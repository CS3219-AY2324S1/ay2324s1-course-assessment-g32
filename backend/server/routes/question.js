const express = require('express');
const router = express.Router();

const questionController = require('../controllers/questionController.js');

router.post('/create', questionController.create);
router.get('/getAll', questionController.getAll);
router.get('/getQuestionDetails', questionController.getQuestionDetails)
router.post('/edit', questionController.edit);
router.delete('/delete', questionController.deleteQuestion);

module.exports = router;
