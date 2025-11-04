// routes/chapterRoutes.js
const express = require('express');
const chapterController = require('../controllers/chapterController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware'); // ← THÊM DÒNG NÀY





const router = express.Router({ mergeParams: true }); // ← QUAN TRỌNG: LẤY courseId TỪ PARENT

// GET /api/courses/:courseId/chapters
router.get('/', authMiddleware, chapterController.getByCourse);

// POST /api/courses/:courseId/chapters/reorder
router.post('/reorder', authMiddleware, chapterController.reorder);
// routes/chapterRoutes.js
router.post('/', authMiddleware, upload.single('video'), chapterController.create);
module.exports = router;