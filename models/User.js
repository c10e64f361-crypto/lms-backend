// models/User.js
const db = require('../config/db');

const User = {
// models/User.js
getAll: (filters, callback) => {
  const { page = 1, limit = 10, search = '', status = '', course_id = '', cccd = '' } = filters;
  const offset = (page - 1) * limit;

  let sql = 'SELECT u.id, u.email, u.fullName, u.cccd, u.role, u.status, u.createdAt, COUNT(DISTINCT er.exam_id) as exams_taken ';
  sql += 'FROM users u ';
  sql += 'LEFT JOIN exam_results er ON u.id = er.user_id ';
  const params = [];

  if (search) {
    sql += 'WHERE (u.fullName LIKE ? OR u.email LIKE ? OR u.cccd LIKE ?) ';
    params.push(`%${search}%`, `%${search}%`, `%${search}%`);
  }

  if (cccd) {
    sql += search ? 'AND ' : 'WHERE ';
    sql += 'u.cccd = ? ';
    params.push(cccd);
  }

  if (status) {
    sql += (search || cccd) ? 'AND ' : 'WHERE ';
    sql += 'u.status = ? ';
    params.push(status);
  }

  if (course_id) {
    sql += 'LEFT JOIN enrollments e ON u.id = e.user_id ';
    sql += (search || cccd || status) ? 'AND ' : 'WHERE ';
    sql += 'e.course_id = ? ';
    params.push(course_id);
  }

  sql += 'GROUP BY u.id ';
  sql += 'ORDER BY u.createdAt DESC ';
  sql += 'LIMIT ? OFFSET ?';
  params.push(parseInt(limit), parseInt(offset));

  db.query(sql, params, (err, results) => {
    if (err) return callback(err);
    callback(null, { data: results, pagination: { total: results.length, page, limit, totalPages: 1 } });
  });
},

  getById: (id, callback) => {
    const sql = `
      SELECT u.*, 
             COUNT(DISTINCT er.exam_id) as exams_taken,
             AVG(er.score) as avg_score
      FROM users u
      LEFT JOIN exam_results er ON u.id = er.user_id
      WHERE u.id = ?
      GROUP BY u.id
    `;
    db.query(sql, [id], (err, results) => {
      if (err || results.length === 0) return callback(err, null);
      callback(null, results[0]);
    });
  },
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
  },
  // THÊM HÀM UPDATE
  update: (id, updates, callback) => {
    const sql = 'UPDATE users SET ? WHERE id = ?';
    db.query(sql, [updates, id], (err, result) => {
      if (err) return callback(err);
      callback(null, result);
    });
  },

  // (TÙY CHỌN) THÊM HÀM DELETE
  delete: (id, callback) => {
    const sql = 'DELETE FROM users WHERE id = ?';
    db.query(sql, [id], (err, result) => {
      if (err) return callback(err);
      callback(null, result);
    });
  }

};



module.exports = User;