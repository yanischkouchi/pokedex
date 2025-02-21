const UserModel = require('../models/user.model');
const UserService = require('../services/user.service');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    let userData = structuredClone(req.body); // pour éviter de modifier le body
    try {
        let hash = await bcrypt.hash(userData.password, 10)
        userData.password = hash;      
        userData.role = "USER";
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
            throw new Error("User/password not fond")
        }
        const uservice = new UserService;
        const isPasswordValid = await uservice.verifyPassword(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "User/password not fond" });
        }
        const myToken = jwt.sign(
            { id: user._id, firstName: user.firstName, email: user.email, role: user.role },
            process.env.TOKEN_SECRET,
            { expiresIn : '2h'}
        );
        res.status(200).json({ id: user._id, firstName: user.firstName, token: myToken, role: user.role });
    
    } catch (err) {
        res.status(400).send(err);
    }
}

exports.checkUser = (req, res) => {
    res.status(204).send();
};
