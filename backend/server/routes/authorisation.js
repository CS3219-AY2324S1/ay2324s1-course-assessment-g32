const express = require('express');
const router = express.Router();

const authorisationController = require('../controllers/authorisationController.js');

router.get('/isMaintainer', authorisationController.isMaintainer);

module.exports = router;
