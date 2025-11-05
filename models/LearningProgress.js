// models/LearningProgress.js
const db = require('../config/db');

const LearningProgress = {

// models/LearningProgress.js
getByUserCourse: (userId, courseId, callback) => {
  const sql = 'SELECT * FROM learning_progress WHERE user_id = ? AND course_id = ?';
  db.query(sql, [userId, courseId], (err, results) => {
    if (err) return callback(err);

    const progress = results[0] || null;
    if (progress) {
      let chapters = [];
      const value = String(progress.chapters_completed || '').trim();

      if (value) {
        if (value.startsWith('[') && value.endsWith(']')) {
          // Là JSON → parse (an toàn)
          try {
            chapters = JSON.parse(value);
          } catch (e) {
            console.error('[Parse] JSON lỗi:', value);
          }
        } else {
          // Là 1,3 → chuyển thành [1,3]
          console.log('[Parse] Dữ liệu cũ (1,3):', value);
          chapters = value.split(',').map(id => parseInt(id.trim())).filter(id => !isNaN(id));
        }
      }
      progress.chapters_completed = chapters;
    }
    callback(null, progress);
  });
},


// models/LearningProgress.js
upsert: (data, callback) => {
  const sql = `
    INSERT INTO learning_progress (user_id, course_id, chapters_completed, total_score, max_score, badge)
    VALUES (?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      chapters_completed = VALUES(chapters_completed),
      total_score = VALUES(total_score),
      max_score = VALUES(max_score),
      badge = VALUES(badge)
  `;
  const chaptersJson = Array.isArray(data.chapters_completed) 
    ? JSON.stringify(data.chapters_completed) 
    : '[]';
  
  db.query(sql, [
    data.user_id, data.course_id,
    chaptersJson,
    data.total_score, data.max_score, data.badge
  ], callback);
},
getByUser: (userId, callback) => {
    const sql = `
      SELECT 
        lp.*, 
        c.title as course_title,
        (SELECT COUNT(*) FROM chapters WHERE course_id = c.id) as total_chapters
      FROM learning_progress lp
      JOIN courses c ON lp.course_id = c.id
      WHERE lp.user_id = ?
      ORDER BY lp.updated_at DESC
    `;
    db.query(sql, [userId], (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  }
};

module.exports = LearningProgress;