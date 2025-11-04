// controllers/courseController.js
const Course = require('../models/Course');

// === TASK 4: DÙNG getAllWithFilters ===
exports.getAll = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search || '';
  const tag = req.query.tag || '';

  Course.getAllWithFilters({ page, limit, search, tag }, (err, result) => {
    if (err) {
      
      console.error('Lỗi lấy khóa học:', err);
      return res.status(500).json({ success: false, message: 'Lỗi server' });
    }

    res.json({
      success: true,
      data: result.data,
      pagination: result.pagination
    });
  });
};


exports.create = (req, res) => {
  const { code, title, description, instructor, duration, level, start_date, end_date, price, category_id, tag } = req.body;
  
  // Upload ảnh (Multer)
  const thumbnail = req.file ? `/uploads/${req.file.filename}` : null;

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
    updates.thumbnail = `/uploads/${req.file.filename}`;
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