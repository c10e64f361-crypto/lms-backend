// routes/chapterRoutes.js
const express = require('express');
const chapterController = require('../controllers/chapterController');
const authMiddleware = require('../middleware/authMiddleware');
const uploadVideo = require('../middleware/uploadVideo');
const router = express.Router({ mergeParams: true });

// GET /api/courses/:courseId/chapters
router.get('/', authMiddleware, chapterController.getByCourse);

// POST /api/courses/:courseId/chapters
router.post('/', authMiddleware, uploadVideo, chapterController.create);

// PUT /api/courses/:courseId/chapters/:id  ← PHẢI CÓ :id
router.put('/:id', authMiddleware,uploadVideo, chapterController.update);

// DELETE /api/courses/:courseId/chapters/:id
router.delete('/:id', authMiddleware, chapterController.delete);

// POST /api/courses/:courseId/chapters/reorder
router.post('/reorder', authMiddleware, chapterController.reorder);

module.exports = router;