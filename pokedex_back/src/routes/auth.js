const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const userController = require('../controllers/user.controller');

router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
router.get('/auth/checkUser', authMiddleware, authController.checkUser);
router.get('/auth/:field', authMiddleware, userController.GetUserByIdOrEmail);

module.exports = router;
