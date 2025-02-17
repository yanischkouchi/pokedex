const Trainer = require('../models/trainer.model');

class TrainerService {
    async createTrainer(username, trainerName, imgUrl) {
        const existingTrainer = await Trainer.findOne({ username });
        if (existingTrainer) {
            throw new Error("This user has a trainer");
        }
        console.log(existingTrainer)
        const trainer = new Trainer({ username, trainerName, imgUrl });
        await trainer.save();
        return trainer;
    }

    async getTrainer(username) {
        const trainer = await Trainer.findOne({ username });
        if (!trainer) {
            throw new Error("Any trainer found");
        }
        return trainer;
    }

    async updateTrainer(username, updates) {
        const trainer = await Trainer.findOneAndUpdate({ username }, updates, { new: true });
        if (!trainer) {
            throw new Error("Trainer not found");
        }
        return trainer;
    }

    async deleteTrainer(username) {
        const trainer = await Trainer.findOneAndDelete({ username });
        if (!trainer) {
            throw new Error("Any trainer found");
        }
        return;
    }
}

module.exports = new TrainerService();
