const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        // headers.authorization contient également le mot-clé Bearer
        // On utilise donc split pour tout récupérer APRèS l'espace dans le header
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: "Token missing" });
        }
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        const userId = decodedToken.id;
        const userEmail = decodedToken.email;
        req.auth = {
            id: userId,
            email: userEmail
        };
        next();
    } catch(error) {
        res.status(401).json({ error: "Invalid or expired token" });
    }
};