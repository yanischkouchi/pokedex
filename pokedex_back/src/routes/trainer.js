const express = require('express');
const router = express.Router();
const trainerController = require('../controllers/trainer.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/trainer', authMiddleware, trainerController.createTrainer);
router.get('/trainer', authMiddleware, trainerController.getTrainer);
router.put('/trainer', authMiddleware, trainerController.updateTrainer);
router.delete('/trainer', authMiddleware, trainerController.deleteTrainer);

module.exports = router;
