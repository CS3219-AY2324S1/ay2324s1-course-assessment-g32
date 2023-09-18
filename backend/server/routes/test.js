const express = require('express');
const authController = require('../controllers/authController.js');

const router = express.Router();

router.post('/getUserInfo', authController.getUserInfo);

module.exports = router;