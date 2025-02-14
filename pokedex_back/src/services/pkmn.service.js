const PkmnType = require('../models/PkmnType');
// const bcrypt = require('bcrypt');

class PkmnService {
    constructor() {        
    }

    getPkmnType() {
        const types = PkmnType.toString()
        return types;
    }
}

module.exports = PkmnService;
