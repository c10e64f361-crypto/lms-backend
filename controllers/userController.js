// controllers/userController.js
const User = require('../models/User');

// controllers/userController.js
exports.getAll = (req, res) => {
  const filters = req.query;
  User.getAll(filters, (err, result) => {
    if (err) {
      console.error('[userController.getAll] Lỗi:', err);
      return res.status(500).json({ success: false, message: 'Lỗi server' });
    }
    res.json({ success: true, data: result.data, pagination: result.pagination });
  });
};

exports.getById = (req, res) => {
  const { id } = req.params;
  User.getById(id, (err, user) => {
    if (err || !user) return res.status(404).json({ success: false });
    res.json({ success: true, data: user });
  });
};

// THÊM HÀM UPDATE
exports.update = (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  User.update(id, updates, (err) => {
    if (err) return res.status(500).json({ success: false });
    res.json({ success: true, message: 'Cập nhật thành công' });
  });
};

// controllers/userController.js
exports.updateRole = (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  if (!['Học viên', 'Giáo viên', 'Quản trị viên'].includes(role)) {
    return res.status(400).json({ success: false, message: 'Quyền không hợp lệ' });
  }

  User.update(id, { role }, (err) => {
    if (err) {
      console.error('[userController.updateRole] Lỗi:', err);
      return res.status(500).json({ success: false });
    }
    res.json({ success: true, message: 'Cập nhật quyền thành công' });
  });
};
// THÊM HÀM DELETE
exports.delete = (req, res) => {
  const { id } = req.params;
  User.delete(id, (err) => {
    if (err) return res.status(500).json({ success: false });
    res.json({ success: true, message: 'Xóa thành công' });
  });
};

exports.getMe = (req, res) => {
  const userId = req.user.id;
  User.getById(userId, (err, user) => {
    if (err || !user) return res.status(404).json({ success: false });
    res.json({ success: true, data: user });
  });
};