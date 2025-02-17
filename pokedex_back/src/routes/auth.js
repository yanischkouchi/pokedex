const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const userController = require('../controllers/user.controller');

router.post('/register', authController.register);
router.post('/login', authMiddleware, authController.login);
router.get('/checkUser', authMiddleware, authController.checkUser);
router.get('/:field', authMiddleware, userController.GetUserByIdOrEmail);

module.exports = router;
