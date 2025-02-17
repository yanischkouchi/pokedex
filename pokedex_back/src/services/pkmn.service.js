const Pkmn = require('../models/pkmn.model');
const PkmnModel = require('../models/pkmn.model');

class PkmnService {
    constructor() {}

    async createPkmn(data) {
        try {
            const newPkmn = new Pkmn(data);
            await newPkmn.save();
            return newPkmn;
        } catch (err) {
            throw new Error("Failed to create Pokémon");
        }
    }

    async addRegionToPkmn(pkmnId, regionName, regionPokedexNumber) {
        try {
            const pkmn = await Pkmn.findById(pkmnId);
            if (!pkmn) {
                throw new Error("Pokémon not found");
            }

            const existingRegion = pkmn.regions.find(region => region.regionName === regionName);

            if (existingRegion) {
                existingRegion.regionPokedexNumber = regionPokedexNumber;
            } else {
                pkmn.regions.push({ regionName, regionPokedexNumber });
            }

            await pkmn.save();
            return pkmn;
        } catch (err) {
            throw new Error("Failed to add/update region for Pokémon: " + err.message);
        }
    }

    async searchPkmn({ partialName, typeOne, typeTwo, page = 1, size = 10 }) {
        try {
            let filter = {};

            if (partialName) {
                filter.name = { $regex: partialName, $options: 'i' }; // $options: 'i' -> recherche insensible aux caractères minus/MAJUS
            }

            if (typeOne) {
                filter.types = { $in: [typeOne] };
            }

            if (typeTwo) {
                filter.types = { $in: [typeTwo] };
            }

            // page = page que l'on souhaite afficher, size = nombre d'éléments de cette page
            const skip = (page - 1) * size;

            const pkmnList = await Pkmn.find(filter)
                .skip(skip)
                .limit(size);

            const totalCount = await Pkmn.countDocuments(filter);

            return {
                data: pkmnList,
                count: totalCount
            };
        } catch (err) {
            throw new Error("Failed to search for Pokémon: " + err.message);
        }
    }

    async getPkmnById(id) {
        try {
            const pokemon = await PkmnModel.findById(id);
            return pokemon;
        } catch (error) {
            console.error("Error fetching Pokémon by ID:", error);
            throw error;
        }
    }

    async getPkmnByName(name) {
        try {
            const pokemon = await PkmnModel.findOne({ name: name });
            return pokemon;
        } catch (error) {
            console.error("Error fetching Pokémon by name:", error);
            throw error;
        }
    }

    async deletePkmnById(id) {
        try {
            const result = await PkmnModel.findByIdAndDelete(id);
            return result !== null;
        } catch (error) {
            console.error("Error deleting Pokémon:", error);
            throw error;
        }
    }

    async updatePkmnById(id, updates) {
        try {
            // vérification que les champs envoyés sont valides
            const validFields = ['name', 'types', 'description', 'imgUrl']; 
            const updateData = {};

            for (const key in updates) {
                if (validFields.includes(key)) {
                    updateData[key] = updates[key];
                }
            }

            if (Object.keys(updateData).length === 0) {
                throw new Error("No valid fields to update");
            }

            const updatedPkmn = await PkmnModel.findByIdAndUpdate(id, updateData, { new: true });

            return updatedPkmn;
        } catch (error) {
            console.error("Error updating Pokémon:", error);
            throw error;
        }
    }

    async removeRegionFromPkmn(pkmnID, regionName) {
        try {
            const pkmn = await PkmnModel.findById(pkmnID);

            if (!pkmn) {
                throw new Error("Pokémon not found");
            }

            // filtrer la région à supprimer
            const initialLength = pkmn.regions.length;
            pkmn.regions = pkmn.regions.filter(region => region.regionName.toLowerCase() !== regionName.toLowerCase());

            if (pkmn.regions.length === initialLength) {
                throw new Error("Region not found");
            }

            await pkmn.save();
            return true;
        } catch (error) {
            console.error("Error removing region from Pokémon:", error);
            throw error;
        }
    }
}

module.exports = PkmnService;
