// routes/homeRoutes.js
const express = require('express');
const homeController = require('../controllers/homeController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, homeController.getHomeData);

module.exports = router;