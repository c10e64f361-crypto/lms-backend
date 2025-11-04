// routes/examRoutes.js
const express = require('express');
const examController = require('../controllers/examController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, examController.getAll);
router.post('/', authMiddleware, examController.create);

module.exports = router;