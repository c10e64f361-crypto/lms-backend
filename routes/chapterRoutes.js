// routes/chapterRoutes.js
const express = require('express');
const chapterController = require('../controllers/chapterController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router({ mergeParams: true });

// GET /api/courses/:courseId/chapters
router.get('/', authMiddleware, chapterController.getByCourse);

// POST /api/courses/:courseId/chapters
router.post('/', authMiddleware, upload.single('video'), chapterController.create);

// PUT /api/courses/:courseId/chapters/:id  ← PHẢI CÓ :id
router.put('/:id', authMiddleware, upload.single('video'), chapterController.update);

// DELETE /api/courses/:courseId/chapters/:id
router.delete('/:id', authMiddleware, chapterController.delete);

// POST /api/courses/:courseId/chapters/reorder
router.post('/reorder', authMiddleware, chapterController.reorder);

module.exports = router;