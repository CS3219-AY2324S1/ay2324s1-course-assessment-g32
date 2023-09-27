const express = require('express');
const router = express.Router();

const authController = require('../../../Auth/server/controllers/authController.js');

router.post('/login', authController.login);
router.post('/signup', authController.signup);
router.post('/authenticate', authController.authenticate);

module.exports = router;
