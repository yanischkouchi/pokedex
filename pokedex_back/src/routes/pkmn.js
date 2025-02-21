const express = require('express');
const router = express.Router();
const pkmnController = require('../controllers/pkmn.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const permMiddleware = require('../middlewares/perm.middleware');

router.post('/pkmn', pkmnController.createPkmn);
router.post('/pkmn/region', pkmnController.addRegionToPkmn);
router.get('/pkmn/search', pkmnController.searchPkmn);
router.get('/pkmn', pkmnController.getPkmn);
router.get('/pkmn/all', pkmnController.getAllPkmn);
router.delete('/pkmn', authMiddleware, permMiddleware.hasRole("ADMIN"), pkmnController.deletePkmnById)
router.put('/pkmn', authMiddleware, permMiddleware.hasRole("ADMIN"), pkmnController.updatePkmnById)
router.delete('/pkmn/region', authMiddleware, permMiddleware.hasRole("ADMIN"), pkmnController.removeRegionFromPkmn)

module.exports = router;
