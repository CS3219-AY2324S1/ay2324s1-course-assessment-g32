const express = require('express');
const router = express.Router();

const authController = require('./AuthController.js');

router.post('/generate', authController.generate);
router.get('/authorize', authController.authorize);
router.get('/authorize-maintainer', authController.authorizeMaintainer);

module.exports = router;
