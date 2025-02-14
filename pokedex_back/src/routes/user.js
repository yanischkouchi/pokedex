const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/user', userController.createUser);
router.get('/user/:idOrEmail', authMiddleware, userController.GetUserByIdOrEmail);
router.put('/user/:id', userController.UpdateUserById);
router.delete('/user/:id', userController.DeleteUserById);

module.exports = router;

