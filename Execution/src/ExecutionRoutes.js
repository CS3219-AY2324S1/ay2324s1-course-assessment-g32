const express = require('express');
const executionController = require('./ExecutionController');
const router = express.Router();

router.post('/python', executionController.executePython);
router.post('/java', executionController.executeJava);
router.post('/js', executionController.executeJs);

module.exports = router;
