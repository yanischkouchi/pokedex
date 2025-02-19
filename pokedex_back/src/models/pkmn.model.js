const mongoose = require('mongoose');

const pkmnSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    types: [{
        type: String,
        enum: ["NORMAL", "FEU", "EAU", "PLANTE", "ÉLECTRIK", "GLACE", 
               "COMBAT", "POISON", "SOL", "VOL", "PSY", "INSECTE", 
               "ROCHE", "SPECTRE", "DRAGON", "TÉNÈBRES", "ACIER", "FÉE"],
        required: true,
    }],
    description: {
        type: String,
    },
    regions: [{
        regionName: {
            type: String,
        },
        regionPokedexNumber: {
            type: Number,
        },
    }],
    imgUrl: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Pkmn = mongoose.model('Pkmn', pkmnSchema);

module.exports = Pkmn;
