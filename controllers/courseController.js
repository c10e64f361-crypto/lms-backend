// controllers/courseController.js
const Course = require('../models/Course');
const db = require('../config/db');
// === TASK 4: DÙNG getAllWithFilters ===
// controllers/courseController.js

// controllers/courseController.js
exports.getAll = (req, res) => {
  const { page = 1, limit = 10, category_id, search } = req.query;
  const offset = (page - 1) * limit;

  let sql = 'SELECT * FROM courses WHERE 1=1';
  let countSql = 'SELECT COUNT(*) as total FROM courses WHERE 1=1';
  const params = [];
  const countParams = [];

  // LỌC THEO DANH MỤC
  if (category_id) {
    sql += ' AND category_id = ?';
    countSql += ' AND category_id = ?';
    params.push(category_id);
    countParams.push(category_id);
  }

  // TÌM KIẾM THEO TITLE HOẶC CODE
  if (search) {
    const like = `%${search}%`;
    sql += ' AND (title LIKE ? OR code LIKE ?)';
    countSql += ' AND (title LIKE ? OR code LIKE ?)';
    params.push(like, like);
    countParams.push(like, like);
  }

  sql += ' ORDER BY id DESC LIMIT ? OFFSET ?';
  params.push(parseInt(limit), parseInt(offset));

  db.query(countSql, countParams, (err, countResult) => {
    if (err) return res.status(500).json({ success: false });
    const total = countResult[0].total;

    db.query(sql, params, (err, results) => {
      if (err) return res.status(500).json({ success: false });
      res.json({ 
        success: true, 
        data: results, 
        total,
        page: parseInt(page),
        totalPages: Math.ceil(total / limit)
      });
    });
  });
};

// ... các hàm create, update, delete của course

exports.create = (req, res) => {
  const { code, title, description, instructor, duration, level, start_date, end_date, price, category_id, tag } = req.body;
  
  // Upload ảnh (Multer)
  const thumbnail = req.file ? `/uploads/images/${req.file.filename}` : null;

  const course = {
    code,
    title,
    description,
    instructor,
    duration,
    level,
    start_date,
    end_date,
    price,
    category_id,
    tag,
    thumbnail
  };

  Course.create(course, (err, result) => {
    if (err) {
      console.error('Lỗi tạo khóa học:', err);
      return res.status(500).json({ success: false, message: 'Lỗi tạo khóa học' });
    }

    res.status(201).json({
      success: true,
      message: 'Tạo khóa học thành công',
      data: { id: result.insertId, ...course }
    });
  });
};

// controllers/courseController.js
exports.getOne = (req, res) => {
  const { id } = req.params;

  Course.findById(id, (err, result) => {
    if (err || result.length === 0) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy khóa học' });
    }
    res.json({ success: true, data: result[0] });
  });
};

// === SỬA KHÓA HỌC ===
exports.update = (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  
  // Upload ảnh mới (nếu có)
  if (req.file) {
    updates.thumbnail = `/uploads/images/${req.file.filename}`;
  }

  Course.update(id, updates, (err) => {
    if (err) {
      console.error('Lỗi sửa:', err);
      return res.status(500).json({ success: false, message: 'Lỗi sửa khóa học' });
    }
    res.json({ success: true, message: 'Sửa thành công' });
  });
};

// === XÓA KHÓA HỌC ===
exports.delete = (req, res) => {
  const { id } = req.params;

  Course.delete(id, (err) => {
    if (err) {
      console.error('Lỗi xóa:', err);
      return res.status(500).json({ success: false, message: 'Lỗi xóa khóa học' });
    }
    res.json({ success: true, message: 'Xóa thành công' });
  });
};