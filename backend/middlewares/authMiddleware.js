const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.authenticate = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access denied: No token provided'})
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await prisma.user.findUnique({ where: { id: decoded.id } });


        if (!user) {
            return res.status(401).json({ message: 'User not found'});
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({message: 'Invalid Token'});
    }

};

