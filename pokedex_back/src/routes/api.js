const express = require('express');
const router = express.Router();

const apiController = require('../controllers/api.controller');

router.get('/pkmn/types', apiController.GetPkmnType);

module.exports = router;
