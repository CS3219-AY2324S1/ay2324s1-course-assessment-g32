const express = require('express');
const router = express.Router();

const loginController = require('../controllers/loginController.js');

// Define the login route
router.post('/login', loginController.loginUser);

module.exports = router;
