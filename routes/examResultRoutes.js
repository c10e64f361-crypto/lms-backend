// routes/examResultRoutes.js
const express = require('express');
const examResultController = require('../controllers/examResultController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router({ mergeParams: true });

router.post('/submit', authMiddleware, examResultController.submit);

module.exports = router;