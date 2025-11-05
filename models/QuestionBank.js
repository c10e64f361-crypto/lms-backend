// models/QuestionBank.js
const db = require('../config/db');

const QuestionBank = {
  getAll: (filters, callback) => {
    const { page = 1, limit = 10, search = '', category = '', difficulty = '' } = filters;
    const offset = (page - 1) * limit;

    let sql = 'SELECT * FROM question_bank WHERE 1=1';
    const params = [];

    if (search) {
      sql += ' AND question_text LIKE ?';
      params.push(`%${search}%`);
    }
    if (category) {
      sql += ' AND category = ?';
      params.push(category);
    }
    if (difficulty) {
      sql += ' AND difficulty = ?';
      params.push(difficulty);
    }

    const countSql = `SELECT COUNT(*) as total FROM (${sql}) as sub`;
    db.query(countSql, params, (err, countRes) => {
      if (err) return callback(err);
      const total = countRes[0].total;

      sql += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
      params.push(parseInt(limit), parseInt(offset));

      db.query(sql, params, (err, results) => {
        if (err) return callback(err);
        callback(null, {
          data: results,
          pagination: { total, page: parseInt(page), limit: parseInt(limit), totalPages: Math.ceil(total / limit) }
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