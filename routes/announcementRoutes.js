// routes/announcementRoutes.js
const express = require('express');
const announcementController = require('../controllers/announcementController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router({ mergeParams: true });

router.get('/', authMiddleware, announcementController.getByCourse);
router.post('/', authMiddleware, announcementController.create);
router.post('/:id/read', authMiddleware, announcementController.markAsRead);

module.exports = router;