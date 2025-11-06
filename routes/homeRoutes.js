// routes/homeRoutes.js
const express = require('express');
const homeController = require('../controllers/homeController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/featured', authMiddleware, homeController.getFeatured);
router.get('/categories', authMiddleware, homeController.getCategories);
router.get('/recent', authMiddleware, homeController.getRecent);

module.exports = router;