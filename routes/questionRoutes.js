// routes/questionRoutes.js
const express = require('express');
const questionController = require('../controllers/questionController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router({ mergeParams: true });

router.get('/', authMiddleware, questionController.getByCourse);
router.post('/', authMiddleware, questionController.create);
router.post('/:questionId/submit', authMiddleware, questionController.submitAnswer);
router.get('/answers', authMiddleware, questionController.getUserAnswers);

module.exports = router;