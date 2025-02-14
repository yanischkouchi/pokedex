const express = require('express');
const router = express.Router();

const apiController = require('../controllers/pkmn.controller');

router.get('/pkmn/types', apiController.GetPkmnType);

module.exports = router;
