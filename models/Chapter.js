// models/Chapter.js
const db = require('../config/db');

const Chapter = {
  // Lấy tất cả chương của 1 khóa học (theo thứ tự)
  getByCourse: (courseId, callback) => {
    const sql = `
      SELECT * FROM chapters 
      WHERE course_id = ? 
      ORDER BY order_number ASC
    `;
    db.query(sql, [courseId], callback);
  },

  // Cập nhật thứ tự chương (Task 8)
  reorder: (courseId, newOrder, callback) => {
    const updates = newOrder.map((chapterId, index) => [chapterId, index + 1]);
    const promises = updates.map(([chapterId, order]) => {
      return new Promise((resolve, reject) => {
        db.query('UPDATE chapters SET order_number = ? WHERE id = ?', [order, chapterId], (err) => {
          if (err) reject(err);
          else resolve();
        });
      });
    });

    Promise.all(promises)
      .then(() => callback(null, { success: true }))
      .catch(err => callback(err));
  },

  create: (chapter, callback) => {
    db.query('INSERT INTO chapters SET ?', chapter, callback);
  },

  update: (id, chapter, callback) => {
    db.query('UPDATE chapters SET ? WHERE id = ?', [chapter, id], callback);
  },

  delete: (id, callback) => {
    db.query('DELETE FROM chapters WHERE id = ?', [id], callback);
  }
};

module.exports = Chapter;