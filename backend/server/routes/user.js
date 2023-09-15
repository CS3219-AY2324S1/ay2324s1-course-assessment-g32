const express = require('express');
const userController = require('../controllers/userController.js');

const router = express.Router();

router.post('/create', userController.createUser);
router.post('/read', userController.getUserInfo);
router.post('/update', userController.updateUser);
router.post('/delete', userController.deleteUser);

module.exports = router;