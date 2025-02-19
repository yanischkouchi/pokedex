const PkmnService = require('../services/pkmn.service');

exports.GetPkmnType = (req, res) => {
    const pkmnService = new PkmnService();
    const types = pkmnService.getPkmnType();
    res.json(types);
};

exports.createPkmn = async (req, res) => {
    try {
        const { name, types, description, imgUrl } = req.body;
        console.log("req.body : ", req.body);

        if (!name || !types || !imgUrl) {
            return res.status(400).json({ error: "Missing required fields", received: req.body });
        }

        // Vérification si types est bien un tableau
        const formattedTypes = Array.isArray(types) ? types : types.split(',');

        const pkmnService = new PkmnService();
        const newPkmn = await pkmnService.createPkmn({ 
            name, 
            types: formattedTypes, // Utilisation du tableau correct
            description,
            imgUrl 
        });
        res.status(201).json(newPkmn);
    } catch (err) {
        res.status(500).json({ error: "Failed to create Pokémon", details: err.message });
    }
};

exports.addRegionToPkmn = async (req, res) => {
    try {
        const { regionName, regionPokedexNumber, pkmnId } = req.body;
        if (!regionName || !regionPokedexNumber || !pkmnId) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const pkmnService = new PkmnService();
        const updatedPkmn = await pkmnService.addRegionToPkmn(pkmnId, regionName, regionPokedexNumber);

        res.status(200).json(updatedPkmn);
    } catch (err) {
        console.error("Error in controller:", err); 
        res.status(500).json({ error: "Failed to add/update region", details: err.message });
    }
};

exports.searchPkmn = async (req, res) => {
    try {
        const { partialName, typeOne, typeTwo, page = 1, size = 10 } = req.query;

        if (isNaN(page) || isNaN(size)) {
            return res.status(400).json({ error: "Page and size must be numbers" });
        }

        const pkmnService = new PkmnService();

        const result = await pkmnService.searchPkmn({
            partialName,
            typeOne,
            typeTwo,
            page: parseInt(page),
            size: parseInt(size)
        });

        res.status(200).json(result);
    } catch (err) {
        console.error("Error in controller:", err);
        res.status(500).json({ error: "Failed to search for Pokémon", details: err.message });
    }
};

exports.getPkmn = async (req, res) => {
    const { id, name } = req.query;
    const pkmnService = new PkmnService();
    
    try {
        let pokemon;
        if (id) {
            pokemon = await pkmnService.getPkmnById(id);
        } else if (name) {
            pokemon = await pkmnService.getPkmnByName(name);
        } else {
            return res.status(400).json({ error: "Provide either id or name" });
        }

        if (!pokemon) {
            return res.status(404).json({ error: "Pokémon not found" });
        }

        res.json(pokemon);
    } catch (error) {
        console.error("err:", error);
        res.status(500).json({ error: "An error occurred while fetching the Pokémon" });
    }
};

exports.getAllPkmn = async (req, res) => {
    try {
        const pkmnService = new PkmnService();
        const allPkmn = await pkmnService.getAllPkmn();
        res.status(200).json(allPkmn);
    } catch (error) {
        console.error("Error fetching all Pokémon:", error);
        res.status(500).json({ error: "An error occurred while fetching all Pokémon" });
    }
};

exports.deletePkmnById = async (req, res) => {
    const { id } = req.query;
    const pkmnService = new PkmnService();

    if (!id) {
        return res.status(400).json({ error: "Pokémon ID is required" });
    }

    try {
        const deleted = await pkmnService.deletePkmnById(id);
        if (!deleted) {
            return res.status(404).json({ error: "Pokémon not found" });
        }

        res.status(204).send();
    } catch (error) {
        console.error("Error deleting Pokémon:", error);
        res.status(500).json({ error: "An error occurred while deleting the Pokémon" });
    }
};

exports.updatePkmnById = async (req, res) => {
    const { id, ...updates } = req.query;
    const pkmnService = new PkmnService();

    if (!id) {
        return res.status(400).json({ error: "Pokémon ID is required" });
    }

    try {
        const updatedPkmn = await pkmnService.updatePkmnById(id, updates);

        if (!updatedPkmn) {
            return res.status(404).json({ error: "Pokémon not found" });
        }

        res.json(updatedPkmn);
    } catch (error) {
        console.error("Error updating Pokémon:", error);
        res.status(500).json({ error: "An error occurred while updating the Pokémon" });
    }
};

exports.removeRegionFromPkmn = async (req, res) => {
    const { pkmnID, regionName } = req.query;
    const pkmnService = new PkmnService();

    if (!pkmnID || !regionName) {
        return res.status(400).json({ error: "pkmnID and regionName are required" });
    }

    try {
        const success = await pkmnService.removeRegionFromPkmn(pkmnID, regionName);

        if (!success) {
            return res.status(404).json({ error: "Pokémon or region not found" });
        }

        res.status(204).send();
    } catch (error) {
        console.error("Error removing region from Pokémon:", error);
        res.status(500).json({ error: "An error occurred while removing the region" });
    }
};