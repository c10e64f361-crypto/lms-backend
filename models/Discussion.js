// models/Discussion.js
const db = require('../config/db');

const Discussion = {
  getByCourse: (courseId, callback) => {
    const sql = `
      SELECT d.*, u.fullName as user_name
      FROM discussions d
      LEFT JOIN users u ON d.user_id = u.id
      WHERE d.course_id = ?
      ORDER BY d.parent_id IS NULL DESC, d.parent_id, d.created_at
    `;
    db.query(sql, [courseId], callback);
  },

  create: (data, callback) => {
    db.query('INSERT INTO discussions SET ?', data, callback);
  },

  like: (id, callback) => {
    db.query('UPDATE discussions SET likes = likes + 1 WHERE id = ?', [id], callback);
  },

  delete: (id, callback) => {
    db.query('DELETE FROM discussions WHERE id = ? OR parent_id = ?', [id, id], callback);
  }
};

module.exports = Discussion;