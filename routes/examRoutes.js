// routes/examRoutes.js
const express = require('express');
const examController = require('../controllers/examController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const router = express.Router();

// QUẢN LÝ KỲ THI (ADMIN)
// KỲ THI CỦA HỌC VIÊN
router.get('/myexams', authMiddleware, examController.getMyExams);
router.get('/', authMiddleware, examController.getAll);
router.post('/', authMiddleware, examController.create);
router.get('/:id', authMiddleware, examController.getById);
router.put('/:id', authMiddleware, examController.update);
router.delete('/:id', authMiddleware, examController.delete);



module.exports = router;