// routes/learningRoutes.js
const express = require('express');
const learningController = require('../controllers/learningController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const router = express.Router({ mergeParams: true });

router.get('/results', authMiddleware, learningController.getResults);
// routes/learningRoutes.js
router.get('/user/:userId', authMiddleware, adminMiddleware, learningController.getByUser);
module.exports = router;