const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.register = async (req, res) => {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password || !role) {
        return res.status(400).json({ message: "All fields are required!"});
    }

    try {
        const existingUser = await prisma.user.findUnique({ where: { email },
        });

        if (existingUser) {
            return res.status(409).json({ message: 'User already exists!'});
        }

        const validRoles = ['STREAMER', 'VIEWER'];
        if (!validRoles.includes(role.toUpperCase())) {
            return res.status(400).json({ message: 'Erro na rola xD'});
        }
        const hashedPasssword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPasssword,
                role: role.toUpperCase(),
            }
        });

        res.status(201).json({
            message: "User registered successfully!",
            user: {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email,
                role: newUser.role,
            },
        })
    } catch (error) {
        res.status(500).json({message: "Error in register user: ", error: error.message});
    }
}