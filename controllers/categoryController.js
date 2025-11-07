// controllers/categoryController.js
const Category = require('../models/Category');

exports.getAll = (req, res) => {
  Category.getAll((err, results) => {
    if (err) {
      console.error('Lỗi lấy danh mục:', err);
      return res.status(500).json({ success: false, message: 'Lỗi server' });
    }
    res.json({ success: true, data: results });
  });
};

exports.create = (req, res) => {
  const { title, description } = req.body;
  if (!title) {
    return res.status(400).json({ success: false, message: 'Thiếu tên danh mục' });
  }

  Category.create({ title, description }, (err, result) => {
    if (err) {
      console.error('Lỗi thêm danh mục:', err);
      return res.status(500).json({ success: false });
    }
    res.status(201).json({ 
      success: true, 
      data: { id: result.insertId, title, description } 
    });
  });
};

exports.update = (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  if (!title) {
    return res.status(400).json({ success: false, message: 'Thiếu tên danh mục' });
  }

  Category.update(id, { title, description }, (err) => {
    if (err) {
      console.error('Lỗi cập nhật danh mục:', err);
      return res.status(500).json({ success: false });
    }
    res.json({ success: true, message: 'Cập nhật thành công' });
  });
};

exports.delete = (req, res) => {
  const { id } = req.params;
  Category.delete(id, (err) => {
    if (err) {
      console.error('Lỗi xóa danh mục:', err);
      return res.status(500).json({ success: false });
    }
    res.json({ success: true, message: 'Xóa thành công' });
  });
};