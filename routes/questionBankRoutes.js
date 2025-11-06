// routes/questionBankRoutes.js
const express = require('express');
const questionBankController = require('../controllers/questionBankController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

const router = express.Router();

// API CHO MODAL NGÂN HÀNG CÂU HỎI
router.get('/', authMiddleware, adminMiddleware, questionBankController.getQuestions);

// Các route khác
router.get('/all', authMiddleware, adminMiddleware, questionBankController.getAll);
router.post('/', authMiddleware, adminMiddleware, questionBankController.create);
router.put('/:id', authMiddleware, adminMiddleware, questionBankController.update);
router.delete('/:id', authMiddleware, adminMiddleware, questionBankController.delete);

module.exports = router;