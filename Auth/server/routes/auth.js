const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController.js');

router.get('/generate', authController.generate);
router.get('/authorize', authController.authorize);
router.get('/authorizeMaintainer', authController.authorizeMaintainer);

module.exports = router;
