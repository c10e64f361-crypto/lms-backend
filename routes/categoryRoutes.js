// routes/categoryRoutes.js
const express = require('express');
const categoryController = require('../controllers/categoryController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

const router = express.Router();

// HỌC VIÊN CŨNG ĐƯỢC LẤY DANH MỤC → CHỈ CẦN ĐĂNG NHẬP
router.get('/', categoryController.getAll);

// CÁC HÀNH ĐỘNG KHÁC → YÊU CẦU ADMIN
router.post('/', authMiddleware, adminMiddleware, categoryController.create);
router.put('/:id', authMiddleware, adminMiddleware, categoryController.update);
router.delete('/:id', authMiddleware, adminMiddleware, categoryController.delete);

module.exports = router;