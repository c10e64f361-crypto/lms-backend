// routes/examQuestionRoutes.js
const express = require('express');
const examQuestionController = require('../controllers/examQuestionController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router({ mergeParams: true });

router.get('/', authMiddleware, examQuestionController.getByExam);
router.post('/', authMiddleware, examQuestionController.create);
router.delete('/:id', authMiddleware, examQuestionController.delete);

module.exports = router;