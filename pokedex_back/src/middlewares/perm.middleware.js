exports.hasRole = (requiredRole) => {
    return (req, res, next) => {
        console.log("req.user", req.user);
        if (!req.user) {
            return res.status(401).json({ error: "Unauthorized" });
        } else if (req.user.role !== requiredRole) {
            return res.status(403).json({ error: "Insufficient permissions" });
        } else {
            next();
        }
    };
};

exports.canUpdateProfile = (req, res, next) => {
    const userRole = req.user.role;
    const userIdToUpdate = req.params.id;
    const userId = req.user.id;

    if (userRole === 'ADMIN') {
        return next();
    } else if (userId === userIdToUpdate) {
        return next();
    } else {
        return res.status(403).json({ error: "Insufficient permissions" });
    }    
};
