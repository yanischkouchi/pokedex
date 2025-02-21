const UserModel = require('../models/user.model');
const bcrypt = require('bcrypt');

class UserService {
    constructor() {        
    }

    // Rrécupérer un User par son ID
    getUserById(id) {
        if(!id) {
            throw new Error("id not found");
        } else if(id.includes('@')) {
            throw new Error("id must not contain @");
        } else {
            return UserModel.findById(id).exec();
        }
    }

    // récupérer un User par son Email
    getUserByEmail(userEmail) {
        if (!userEmail) {
            throw new Error("email not found");
        } else {
            return UserModel.findOne({ email: userEmail }).exec();
        }
    }

    // mettre à jour un User par son ID
    updateUserById(id, updateData) {
        if(!id) {
            throw new Error("id not found");
        } else {
            return UserModel.findByIdAndUpdate(id, updateData);
        }
    }

    // supprimer un User par son ID
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
            console.error("Error during password verification :", error);
            return false;
        }
    }
}

module.exports = UserService;
