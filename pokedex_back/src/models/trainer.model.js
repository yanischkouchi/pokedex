const mongoose = require('mongoose');

const trainerSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    imgUrl: String,
    trainerName: { type: String, required: true },
    creationDate: { type: Date, default: Date.now },
    pkmnSeen: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pkmn' }],
    pkmnCatch: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pkmn' }]
})

const Trainer = mongoose.model('Trainer', trainerSchema);

module.exports = Trainer;