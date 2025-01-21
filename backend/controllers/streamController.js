const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.uploadVideo = async (req, res) => {
    const { title, description, url } = req.body;

    if (!title || !description || !url) {
        return res.status(400).json({ message: "All fields are required "});
    }

    try {
        const video = await prisma.video.create({
            data: {
                title, 
                description,
                url,
                createdAt: new Date(),
            },
        });

        res.status(201).json({ message: "Video uploaded successfully!", video });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong when uploading video! error: ", error: error.message})
    }
}