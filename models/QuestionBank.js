// models/QuestionBank.js
const db = require('../config/db');

const QuestionBank = {
  getAll: (filters, callback) => {
    const { page = 1, limit = 10, search = '', category = '', difficulty = '' } = filters;
    const offset = (page - 1) * limit;

    // === XÂY DỰNG WHERE CHO CẢ HAI QUERY ===
    let whereClause = '';
    const whereParams = [];

    if (search) {
      whereClause += ' AND (question_text LIKE ? OR category LIKE ?)';
      whereParams.push(`%${search}%`, `%${search}%`);
    }
    if (category && category !== 'Tất cả') {
      whereClause += ' AND category = ?';
      whereParams.push(category);
    }
    if (difficulty && difficulty !== 'Tất cả') {
      whereClause += ' AND difficulty = ?';
      whereParams.push(difficulty);
    }

    // === 1. ĐẾM TỔNG (KHÔNG DÙNG SUBQUERY) ===
    const countQuery = `SELECT COUNT(*) as total FROM question_bank WHERE 1=1 ${whereClause}`;
    db.query(countQuery, whereParams, (err, countResult) => {
      if (err) {
        console.error('Lỗi đếm tổng:', err);
        return callback(err);
      }

      const total = countResult[0].total || 0;

      // === 2. LẤY DỮ LIỆU ===
      const dataQuery = `
        SELECT * FROM question_bank 
        WHERE 1=1 ${whereClause}
        ORDER BY created_at DESC 
        LIMIT ? OFFSET ?
      `;

      const dataParams = [...whereParams, parseInt(limit), parseInt(offset)];

      db.query(dataQuery, dataParams, (err, results) => {
        if (err) {
          console.error('Lỗi lấy dữ liệu:', err);
          return callback(err);
        }

        const totalPages = total > 0 ? Math.ceil(total / limit) : 1;

        callback(null, {
          data: results,
          pagination: {
            page: parseInt(page),
            limit: parseInt(limit),
            total,
            totalPages
          }
        });
      });
    });
  },

  create: (data, callback) => {
    db.query('INSERT INTO question_bank SET ?', data, callback);
  },

  update: (id, data, callback) => {
    db.query('UPDATE question_bank SET ? WHERE id = ?', [data, id], callback);
  },

  delete: (id, callback) => {
    db.query('DELETE FROM question_bank WHERE id = ?', [id], callback);
  }
};

module.exports = QuestionBank;