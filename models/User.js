// models/User.js
const db = require('../config/db');

const User = {
  findByEmail: (email, callback) => {
    db.query('SELECT * FROM users WHERE email = ?', [email], callback);
  },
  // Tạo user mới ← THÊM HÀM NÀY
  create: (userData, callback) => {
    const query = 'INSERT INTO users (cccd, fullName, email, password, role) VALUES (?, ?, ?, ?, ?)';
    const values = [userData.cccd, userData.fullName, userData.email, userData.password, userData.role || 'Học viên'];
    db.query(query, values, (err, result) => {
      if (err) return callback(err);
      callback(null, result); // result.insertId = ID mới tạo
    });
  }
};

module.exports = User;