// models/Exam.js
const db = require('../config/db');

const Exam = {
  getAllWithFilters: (filters, callback) => {
    const { page = 1, limit = 10, search = '', status = '' } = filters;
    const offset = (page - 1) * limit;

    let sql = 'SELECT * FROM exams WHERE 1=1';
    const params = [];

    if (search) {
      sql += ' AND (title LIKE ? OR description LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }
    if (status) {
      sql += ' AND status = ?';
      params.push(status);
    }

    const countSql = 'SELECT COUNT(*) as total FROM (' + sql + ') as sub';
    db.query(countSql, params, (err, countResult) => {
      if (err) return callback(err);

      const total = countResult[0].total;

      sql += ' ORDER BY start_time DESC LIMIT ? OFFSET ?';
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

  create: (exam, callback) => {
    db.query('INSERT INTO exams SET ?', exam, callback);
  },

  update: (id, exam, callback) => {
    db.query('UPDATE exams SET ? WHERE id = ?', [exam, id], callback);
  },

  delete: (id, callback) => {
    db.query('DELETE FROM exams WHERE id = ?', [id], callback);
  },
  // models/Exam.js
updateStatus: (id, status, callback) => {
  db.query('UPDATE exams SET status = ? WHERE id = ?', [status, id], callback);
},
// models/Exam.js
getById: (id, callback) => {
  const sql = 'SELECT * FROM exams WHERE id = ?';
  db.query(sql, [id], (err, results) => {
    if (err) return callback(err);
    callback(null, results[0] || null);
  });
},
};

module.exports = Exam;