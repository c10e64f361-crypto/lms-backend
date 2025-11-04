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
      // XỬ LÝ NẾU chapters_completed KHÔNG PHẢI JSON
      if (progress.chapters_completed === null) {
        progress.chapters_completed = '[]';
      } else if (typeof progress.chapters_completed === 'string') {
        try {
          progress.chapters_completed = JSON.parse(progress.chapters_completed);
        } catch (e) {
          console.warn('[LearningProgress] Dữ liệu cũ không phải JSON:', progress.chapters_completed);
          // Chuyển 1,3 → [1,3]
          const ids = progress.chapters_completed.split(',').map(id => id.trim()).filter(id => id);
          progress.chapters_completed = ids.map(id => parseInt(id));
        }
      }
    }
    callback(null, progress);
  });
},

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
    db.query(sql, [
      data.user_id, data.course_id,
      data.chapters_completed ? JSON.stringify(data.chapters_completed) : null,
      data.total_score, data.max_score, data.badge
    ], callback);
  }
};

module.exports = LearningProgress;