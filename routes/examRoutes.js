// routes/examRoutes.js
const express = require('express');
const examController = require('../controllers/examController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, examController.getAll);
router.post('/', authMiddleware, examController.create);
router.put('/:id', authMiddleware, examController.update);
router.delete('/:id', authMiddleware, examController.delete);
// routes/examRoutes.js
router.get('/:id', authMiddleware, examController.getById); // ← THÊM DÒNG NÀY
module.exports = router;