// routes/reportRoutes.js
const express = require('express');
const reportController = require('../controllers/reportController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

const router = express.Router();

router.get('/stats', authMiddleware, adminMiddleware, reportController.getStats);

module.exports = router;