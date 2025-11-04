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
  },
  // models/Chapter.js
getByCourse: (courseId, callback) => {
  const sql = `
    SELECT 
      c.*, 
      p.title AS parent_title
    FROM chapters c
    LEFT JOIN chapters p ON c.parent_id = p.id
    WHERE c.course_id = ?
    ORDER BY COALESCE(c.parent_id, c.id), c.order_number
  `;
  db.query(sql, [courseId], (err, results) => {
    if (err) return callback(err);

    // XÂY CÂY CHƯƠNG
    const chapters = [];
    const map = {};

    results.forEach(row => {
      const chapter = {
        id: row.id,
        title: row.title,
        description: row.description,
        video_url: row.video_url,
        duration: row.duration,
        order_number: row.order_number,
        children: []
      };

      map[row.id] = chapter;

      if (!row.parent_id) {
        chapters.push(chapter);
      } else {
        map[row.parent_id].children.push(chapter);
      }
    });

    callback(null, chapters);
  });
}
};

module.exports = Chapter;