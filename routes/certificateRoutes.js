// routes/certificateRoutes.js
const express = require('express');
const certificateController = require('../controllers/certificateController');
const tokenMiddleware = require('../middleware/tokenMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// TẢI CHỨNG CHỈ - CHO PHÉP TOKEN TRONG HEADER HOẶC QUERY
router.get('/:userId/:courseId', tokenMiddleware, certificateController.generate);
router.get('/me/:courseId', authMiddleware, certificateController.generate);

// XEM TẤT CẢ CHỨNG CHỈ (ADMIN)
router.get('/all', tokenMiddleware, adminMiddleware, certificateController.getAll);

module.exports = router;


module.exports = router;