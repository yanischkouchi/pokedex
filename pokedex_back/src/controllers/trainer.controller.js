const TrainerService = require('../services/trainer.service');
const Pkmn = require('../models/pkmn.model');
const Trainer = require('../models/trainer.model');

exports.createTrainer = async (req, res) => {
    try {
        const { trainerName, imgUrl } = req.body;
        const username = req.user.firstName;
        const trainer = await TrainerService.createTrainer(username, trainerName, imgUrl);
        res.status(201).json(trainer);
    } catch (err) {
        console.log(err)
        res.status(400).json({ error: err.message });
    }
};

exports.getTrainer = async (req, res) => {
    try {
        const username = req.user.firstName;
        
        const trainer = await TrainerService.getTrainer(username);

        res.json(trainer);
    } catch (err) {
        console.error(err);
        if (err.message === "Any trainer found") {
            return res.status(404).json({ error: "Trainer not found" });
        }
        res.status(500).json({ error: "Error retrieving trainer" });
    }
};


exports.updateTrainer = async (req, res) => {
    try {
        const username = req.user.firstName;
        const updates = req.body;
        const trainer = await TrainerService.updateTrainer(username, updates);
        res.json(trainer);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteTrainer = async (req, res) => {
    try {
        const username = req.user.firstName;
        await TrainerService.deleteTrainer(username);
        res.status(204).send();
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.markPokemon = async (req, res) => {
    const { isCaptured, pokemonId } = req.body;
    
    try {
        const user = req.user;
        const pokemon = await Pkmn.findById(pokemonId);
        if (!pokemon) {
            return res.status(404).json({ error: "Pokémon not found" });
        }

        const trainer = await Trainer.findOne({ username: user.firstName });

        if (!trainer) {
            return res.status(404).json({ error: "Trainer not found" });
        }

        // ajout du Pokémon dans la liste appropriée
        if (isCaptured) {
            if (!trainer.pkmnCatch.includes(pokemonId)) {
                trainer.pkmnCatch.push(pokemonId);
            }
        } else {
            if (!trainer.pkmnSeen.includes(pokemonId)) {
                trainer.pkmnSeen.push(pokemonId);
            }
        }

        await trainer.save();

        res.json(trainer);
    } catch (err) {
        res.status(500).json({ error: "An error occurred" });
    }
};
