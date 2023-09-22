const express = require('express');
const userController = require('../controllers/userController.js');

const router = express.Router();

router.get('/readAll', userController.getAllUserInfo);
router.post('/read', userController.getUserInfo);
router.post('/update', userController.updateUser);
router.post('/delete', userController.deleteUser);
router.post('/change-password', userController.changePassword);

module.exports = router;
