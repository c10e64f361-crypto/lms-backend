// routes/examQuestionRoutes.js
const express = require('express');
const examQuestionController = require('../controllers/examQuestionController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const router = express.Router({ mergeParams: true });

router.get('/', authMiddleware, examQuestionController.getByExam);
router.post('/', authMiddleware, examQuestionController.create);
router.delete('/:id', authMiddleware, examQuestionController.delete);
// HỌC VIÊN: ẨN ĐÁP ÁN
router.get('/:examId/questions/student', authMiddleware, examQuestionController.getForStudent);

// SAU NỘP: CÓ ĐÁP ÁN
router.get('/:examId/questions/with-answers', authMiddleware, examQuestionController.getWithAnswers);

// ADMIN: CÓ ĐÁP ÁN
router.get('/:examId/questions', authMiddleware, adminMiddleware, examQuestionController.getForAdmin);
module.exports = router;