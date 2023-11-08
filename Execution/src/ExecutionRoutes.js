const express = require('express');
const router = express.Router();

const executionController = require('./ExecutionController');

router.post('/python', executionController.executePython);
router.post('/java', executionController.executeJava);
router.post('/js', executionController.executeJs);

module.exports = router;
