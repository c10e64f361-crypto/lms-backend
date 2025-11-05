// routes/dashboardRoutes.js
const express = require('express');
const dashboardController = require('../controllers/dashboardController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

const router = express.Router();

router.get('/overview', authMiddleware, adminMiddleware, dashboardController.getOverview);

module.exports = router;