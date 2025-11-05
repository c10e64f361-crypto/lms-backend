// routes/learningRoutes.js
const express = require('express');
const learningController = require('../controllers/learningController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const router = express.Router({ mergeParams: true });
// routes/learningRoutes.js
router.get('/results', authMiddleware, learningController.getResults);
// routes/learningRoutes.js
router.get('/user/:userId', authMiddleware, adminMiddleware, learningController.getByUser);
// routes/learningRoutes.js
// Biểu đồ hoàn thành khóa học
router.get('/chart/completion', authMiddleware, adminMiddleware, learningController.getCompletionChart);
router.get('/certificates', authMiddleware, learningController.getCertificates);
// Biểu đồ điểm trung bình
router.get('/chart/avg-score', authMiddleware, adminMiddleware, learningController.getAverageScoreChart);
module.exports = router;