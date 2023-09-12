const express = require('express');
const router = express.Router();

const questionController = require('../controllers/questionController.js');

// Define the create new question route
router.post('/create', questionController.create);

// Define the get all questions route
router.get('/getAll', questionController.getAll);

// Define the get question details route
router.get('/getQuestionDetails', questionController.getQuestionDetails)

// Defining the edit question route
router.post('/edit', questionController.edit);

// Defining the delete question route
router.delete('/delete', questionController.deleteQuestion);


module.exports = router;
