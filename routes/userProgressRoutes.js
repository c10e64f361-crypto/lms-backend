// routes/userProgressRoutes.js
const express = require('express');
const router = express.Router();
const userProgressController = require('../controllers/userProgressController');
const authMiddleware = require('../middleware/authMiddleware');

// LẤY TIẾN ĐỘ CỦA KHÓA HỌC
router.get('/course/:course_id', authMiddleware, userProgressController.getProgress);

// HOÀN THÀNH CHƯƠNG
router.post('/chapter', authMiddleware, userProgressController.completeChapter);

module.exports = router;