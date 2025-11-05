// routes/questionBankRoutes.js
const express = require('express');
const questionBankController = require('../controllers/questionBankController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, questionBankController.getAll);
router.post('/', authMiddleware, questionBankController.create);
router.put('/:id', authMiddleware, questionBankController.update);
router.delete('/:id', authMiddleware, questionBankController.delete);

module.exports = router;