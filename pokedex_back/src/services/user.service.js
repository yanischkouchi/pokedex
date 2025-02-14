const UserModel = require('../models/user.model');
const bcrypt = require('bcrypt');

class UserService {
    constructor() {        
    }

    // Récupérer un User par son ID
    getUserById(id) {
        if(!id) {
            throw new Error("id not found");
        } else if(id.includes('@')) {
            throw new Error("id must not contain @");
        } else {
            return UserModel.findById(id).exec();
        }
    }

    // Récupérer un User par son Email
    getUserByEmail(userEmail) {
        if (!userEmail) {
            throw new Error("email not found");
        } else {
            return UserModel.findOne({ email: userEmail }).exec();
        }
    }

    // Mettre à jour un User par son ID
    updateUserById(id, updateData) {
        if(!id) {
            throw new Error("id not found");
        } else {
            return UserModel.findByIdAndUpdate(id, updateData);
        }
    }

    // Supprimer un User par son ID
    deleteUserById(id) {
        if(!id) {
            throw new Error("id not found");
        } else {
            return UserModel.findByIdAndDelete(id);
        }       
    }

    verifyPassword(password, hash) {
        try {
            return bcrypt.compare(password, hash);
        } catch (error) {
            console.error("Erreur lors de la vérification du mot de passe :", error);
            return false;
        }
    }
}

module.exports = UserService;
