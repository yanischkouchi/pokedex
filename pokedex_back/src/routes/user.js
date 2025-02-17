const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const permMiddleware = require('../middlewares/perm.middleware');

router.post('/user', userController.createUser);
router.get('/user/:idOrEmail', authMiddleware, userController.GetUserByIdOrEmail);
router.put('/user/:id', authMiddleware, permMiddleware.canUpdateProfile, userController.UpdateUserById);
router.delete('/user/:id', authMiddleware, permMiddleware.hasRole("ADMIN"), userController.DeleteUserById);

module.exports = router;

