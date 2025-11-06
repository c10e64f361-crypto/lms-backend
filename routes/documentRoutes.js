// routes/documentRoutes.js
const express = require('express');
const documentController = require('../controllers/documentController');
const uploadDocument = require('../middleware/uploadDocument');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

const router = express.Router();

// LẤY TÀI LIỆU
router.get('/', authMiddleware, documentController.getByCourse);

// TẢI LÊN TÀI LIỆU (middleware trước, controller sau)
router.post('/', 
  authMiddleware, 
  adminMiddleware, 
  uploadDocument,           // ← Middleware
  documentController.upload // ← Controller
);

// XÓA TÀI LIỆU
router.delete('/:id', authMiddleware, adminMiddleware, documentController.delete);

module.exports = router;