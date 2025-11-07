// models/Course.js
const db = require('../config/db');

const Course = {
  // === TASK 4: Lấy danh sách có phân trang, tìm kiếm, lọc tag ===
  // models/Course.js
getAllWithFilters: (filters, callback) => {
  const { page, limit, search, tag, category_id } = filters;
  const offset = (page - 1) * limit;

  let sql = 'SELECT * FROM courses WHERE 1=1';
  let countSql = 'SELECT COUNT(*) as total FROM courses WHERE 1=1';
  const params = [];
  const countParams = [];

  if (search) {
    sql += ' AND (title LIKE ? OR description LIKE ?)';
    countSql += ' AND (title LIKE ? OR description LIKE ?)';
    const like = `%${search}%`;
    params.push(like, like);
    countParams.push(like, like);
  }

  if (tag) {
    sql += ' AND tag LIKE ?';
    countSql += ' AND tag LIKE ?';
    params.push(`%${tag}%`);
    countParams.push(`%${tag}%`);
  }

  if (category_id) {
    sql += ' AND category_id = ?';
    countSql += ' AND category_id = ?';
    params.push(category_id);
    countParams.push(category_id);
  }

  sql += ' ORDER BY id DESC LIMIT ? OFFSET ?';
  params.push(limit, offset);

  // LẤY TỔNG SỐ
  db.query(countSql, countParams, (err, countResult) => {
    if (err) return callback(err);
    const total = countResult[0].total;

    // LẤY DỮ LIỆU
    db.query(sql, params, (err, results) => {
      if (err) return callback(err);

      const totalPages = Math.ceil(total / limit);

      callback(null, {
        data: results,
        total,
        page: parseInt(page),
        totalPages
      });
    });
  });
},

  // === TASK 7: Lấy 1 khóa học theo ID (cho sửa) ===
  findById: (id, callback) => {
    const sql = `
      SELECT 
        c.*, 
        cat.title AS category_title 
      FROM courses c
      LEFT JOIN categories cat ON c.category_id = cat.id
      WHERE c.id = ?
    `;
    db.query(sql, [id], (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  },

  // === Các hàm cũ giữ nguyên ===
  getAll: (callback) => {
    db.query('SELECT * FROM courses', callback);
  },

  create: (course, callback) => {
    db.query('INSERT INTO courses SET ?', course, callback);
  },

  update: (id, course, callback) => {
    db.query('UPDATE courses SET ? WHERE id = ?', [course, id], callback);
  },

  delete: (id, callback) => {
    db.query('DELETE FROM courses WHERE id = ?', [id], callback);
  }
};

module.exports = Course;