const TrainerService = require('../services/trainer.service');

exports.createTrainer = async (req, res) => {
    console.log("req.user : ", req.user)
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
        console.log("username : ", req.user.firstName)
        const username = req.user.firstName; // Utilise directement le username de req.user
        
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
