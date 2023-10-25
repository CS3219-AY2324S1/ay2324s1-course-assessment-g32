const express = require('express');
const router = express.Router();

const executionController = require('./ExecutionController.js');

router.post('/execute-python', executionController.executePython);
router.post('/execute-java', executionController.executeJava);
router.post('/execute-cpp', executionController.executeCpp);
router.post('/execute-js', executionController.executeJs);

module.exports = router;
