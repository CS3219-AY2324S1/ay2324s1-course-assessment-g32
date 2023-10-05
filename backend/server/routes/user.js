const express = require('express');
const router = express.Router();

const userController = require('../../../backend/server/controllers/userController.js');

router.post('/login', userController.login);
router.post('/signup', userController.signup);
router.post('/create', userController.createUser);
router.get('/readAll', userController.getAllUserInfo);
router.post('/read', userController.getUserInfo);
router.post('/update', userController.updateUser);
router.post('/delete', userController.deleteUser);
router.post('/change-password', userController.changePassword);

module.exports = router;
