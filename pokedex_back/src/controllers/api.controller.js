const PkmnType = require('../models/PkmnType');
const PkmnService = require('../services/pkmn.service');


exports.GetPkmnType = (req, res) => {
    const pkmnService = new PkmnService();
    const types = pkmnService.getPkmnType();
    res.json(types);
};