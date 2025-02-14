const UserModel = require('../models/user.model');
const UserService = require('../services/user.service');
const bcrypt = require('bcrypt');

exports.createUser = async (req, res) => {
    let user;
    let userData = structuredClone(req.body); // Pour éviter de modifier le body
    try {
        let hash = await bcrypt.hash(userData.password, 10)
        userData.password = hash;      
        user = await UserModel.create(userData);
        res.status(200).json(user);
    } catch (err) {
        res.status(400).send(err);
    }
}

exports.GetUserByIdOrEmail = async (req, res) => {
    const uservice = new UserService;
    try {
        const { idOrEmail } = req.params;
        console.log("req.auth.email : ", req.auth.email)
        console.log("idOrEmail : ", idOrEmail)
        if (req.auth.id !== idOrEmail && req.auth.email !== idOrEmail) {
            return res.status(403).json({ error: "Access denied" });
        }

        const user = idOrEmail.includes('@')
            ? await uservice.getUserByEmail(idOrEmail)
            : await uservice.getUserById(idOrEmail);
        
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        } else {
            res.json(user);
        }
    } catch (err) {
        res.status(400).json(err);
    }
}

exports.UpdateUserById = async (req, res) => {
    const uservice = new UserService;
    try {
        const user = await uservice.updateUserById(req.params.id, req.body);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        } else {
            res.status(200).json(user);
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

exports.DeleteUserById = async (req, res) => {
    const uservice = new UserService;
    try {
        const user = await uservice.deleteUserById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        } else {
            res.status(200).json(user);
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}