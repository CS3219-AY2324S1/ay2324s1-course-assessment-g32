const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController.js');

router.post('/login', authController.login);
router.post('/signup', authController.signup);
router.get('/authorize', authController.authorize);
// router.post('/authenticate', authController.authenticate);

module.exports = router;
