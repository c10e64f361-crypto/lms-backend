// models/Course.js
const db = require('../config/db');

const Course = {
  // === TASK 4: Lấy danh sách có phân trang, tìm kiếm, lọc tag ===
  getAllWithFilters: (filters, callback) => {
    const { page = 1, limit = 10, search = '', tag = '' } = filters;
    const offset = (page - 1) * limit;

    let sql = `
      SELECT 
        c.*, 
        cat.title AS category_title 
      FROM courses c
      LEFT JOIN categories cat ON c.category_id = cat.id
      WHERE 1=1
    `;
    const params = [];

    if (search) {
      sql += ` AND (c.title LIKE ? OR c.code LIKE ?)`;
      params.push(`%${search}%`, `%${search}%`);
    }
    if (tag) {
      sql += ` AND c.tag = ?`;
      params.push(tag);
    }

    // Đếm tổng
    const countSql = `SELECT COUNT(*) as total FROM (${sql}) as sub`;
    db.query(countSql, params, (err, countResult) => {
      if (err) return callback(err);
      const total = countResult[0].total;

      // Phân trang
      sql += ` ORDER BY c.id ASC LIMIT ? OFFSET ?`;
      params.push(parseInt(limit), parseInt(offset));

      db.query(sql, params, (err, results) => {
        if (err) return callback(err);

        callback(null, {
          data: results,
          pagination: {
            total,
            page: parseInt(page),
            limit: parseInt(limit),
            totalPages: Math.ceil(total / limit)
          }
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