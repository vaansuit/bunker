const express = require('express');
const { authorizeRoles } = require('../middlewares/roleMiddleware');
const { uploadVideo, getAnalytics, viewStream, liveDashboard, getVideos, viewerHomePage, streamerHomePage } = require('../controllers/streamController');
const { authenticate } = require ('../middlewares/authMiddleware');

const router = express.Router();

router.post('/upload', authenticate, authorizeRoles('STREAMER'), uploadVideo);
router.get('/analytics', authenticate, authorizeRoles('STREAMER'), getAnalytics);
router.get('/dashboard/live', authenticate, authorizeRoles('STREAMER'), liveDashboard);
router.get('/streamer/home', authenticate, authorizeRoles('STREAMER'), streamerHomePage);
router.get('/viewer/home', authenticate, authorizeRoles('VIEWER'), viewerHomePage);
router.get('/videos', authenticate, authorizeRoles('STREAMER', 'VIEWER'), getVideos)
router.get('/livestream/view', authenticate, authorizeRoles('STREAMER','VIEWER'), viewStream);


module.exports = router;
