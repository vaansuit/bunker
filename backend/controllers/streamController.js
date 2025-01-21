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
        res.status(500).json({ message: "Something went wrong when uploading video! error: ", error: error.message });
    }


}

exports.getAnalytics = async (req, res) => {
    try {
        //mocked response
        const analytics = {
            totalViews: 1500,
            totalVideos: 10,
            totalComments: 45,
        }

        res.status(200).json({ message: 'Analytics fetched successfully', analytics});      
    } catch (error) {
        res.status(500).json({ message: "Something went wrong fetching analytics: ", error: error.message});
    }
}

exports.liveDashboard = async(req, res) => {
    try {
        //mocked
        const liveData = {
            isStreaming: true,
            currentViewers: 42,
            streamKey: 'streamer-12345'
        }

        res.status(200).json({ message: 'Dashboard data fetched successfully', liveData })
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong fetching dashboard data', error: error.message});
    }
};

exports.streamerHomePage = async(req, res) => {
    try {
        const videos = await prisma.video.findMany({
            where: {
                userId: req.user.id
            },
        })
    res.status(200).json({ message: "Streamer home page loaded"});
    } catch (error) {
        res.status(500).json({ message: "Error in loading home page: ", error: error.message});
    }
};

exports.viewerHomePage = async (req, res) => {
    try {
        const trendingVideos = await prisma.video.findMany({
            take: 10,
        });

        res.status(200).json({ message: "Viewer home page loaded!"})
    } catch (error) {
        res.status(500).json({ message: "Error in loading viewer home page: ", error: error.message });
    }
};

