const express = require('express');
const router = express.Router();

const userController = require('./UserController');
const middleware = require('./helpers/middleware');

// No middleware function
router.post('/signup', userController.signup);

// Get JWT token after logging in
router.post('/login', userController.login, middleware.getToken);

// Only maintainer can access these routes
router.get('/all', middleware.checkTokenMaintainer, userController.getAllUserInfo);
router.put('/toggle-user-role', middleware.checkTokenMaintainer, userController.toggleUserRole);

// User and maintainer can access the remaining routes
router.get('/', middleware.checkToken, userController.getUserInfo);
router.put('/display-name', middleware.checkToken, userController.updateDisplayName);
router.put('/programming-language', middleware.checkToken, userController.updateProgrammingLanguage);
router.put('/change-password', middleware.checkToken, userController.changePassword);
router.put('/complexity', middleware.checkToken, userController.updateComplexity);
router.delete('/', middleware.checkToken, userController.deleteUser);

module.exports = router;
