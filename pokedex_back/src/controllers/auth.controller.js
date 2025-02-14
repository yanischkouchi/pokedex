const UserModel = require('../models/user.model');
const UserService = require('../services/user.service');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    let user;
    let userData = structuredClone(req.body); // Pour éviter de modifier le body
    try {
        let hash = await bcrypt.hash(userData.password, 10)
        userData.password = hash;      
        user = await UserModel.create(userData);
        res.status(200).json({ message: "User created with success !" });
    } catch (err) {
        res.status(400).send(err);
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email }).select('+password');
        if (!user) {
            throw new Error("User/password not find")
        }
        const uservice = new UserService;
        const isPasswordValid = await uservice.verifyPassword(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Email/Mot de passe incorrect." });
        }
        const myToken = jwt.sign(
            { id: user._id, email: user.email },
            process.env.TOKEN_SECRET,
            { expiresIn : '2h'}
        );
        res.status(200).json({ id: user._id, token: myToken });
    
    } catch (err) {
        console.log("erreur : ", err);
        res.status(400).send(err);
    }
}

exports.checkUser = (req, res) => {
    res.status(204).send();
};
