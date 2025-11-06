// controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const db = require('../config/db'); // ← ĐÃ IMPORT
require('dotenv').config();

// === ĐĂNG KÝ ===
exports.register = async (req, res) => {
  const { cccd, fullName, email, password } = req.body;

  // Kiểm tra email trùng
  User.findByEmail(email, async (err, results) => {
    if (err) return res.status(500).json({ message: 'Lỗi server' });
    if (results.length > 0) return res.status(400).json({ message: 'Email đã được sử dụng' });

    // Kiểm tra CCCD trùng ← ĐÃ CÓ db
    db.query('SELECT * FROM users WHERE cccd = ?', [cccd], async (err, results) => {
      if (err) return res.status(500).json({ message: 'Lỗi server' });
      if (results.length > 0) return res.status(400).json({ message: 'CCCD đã được đăng ký' });

      // Mã hóa mật khẩu
      const hashedPassword = await bcrypt.hash(password, 10);

      // Tạo user mới
      const newUser = { cccd, fullName, email, password: hashedPassword, role: 'Học viên' };
      User.create(newUser, (err, result) => {
        if (err) return res.status(500).json({ message: 'Lỗi tạo tài khoản' });

        const token = jwt.sign({ id: result.insertId, role: 'Học viên' }, process.env.JWT_SECRET, { expiresIn: '8h' });
        res.status(201).json({
          message: 'Đăng ký thành công',
          token,
          user: { id: result.insertId, fullName, email, role: 'Học viên' }
        });
      });
    });
  });
};

// === ĐĂNG NHẬP (ĐÃ CÓ) ===
exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findByEmail(email, async (err, results) => {
    if (err || results.length === 0) {
      return res.status(401).json({ message: 'Email không tồn tại' });
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Mật khẩu sai' });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || 'fallback-secret-key',
      { expiresIn: '8h' }
    );

    res.json({
      message: 'Đăng nhập thành công',
      token,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role
      }
    });
  });
};