exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        const userRole = req.user?.role; //assume role is populate when sign in

        if (!roles.includes(userRole)) {
            return res.status(403).json({ messa: "Access denied: Insufficient permissions"});
        }

        next();
    };
};

