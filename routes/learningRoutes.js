// routes/learningRoutes.js
const express = require('express');
const learningController = require('../controllers/learningController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router({ mergeParams: true });

router.get('/results', authMiddleware, learningController.getResults);

module.exports = router;