// controllers/userProgressController.js
const db = require('../config/db');

// controllers/userProgressController.js
exports.getProgress = (req, res) => {
  const course_id = Number(req.params.course_id);
  const user_id = req.user.id;

  // LOG DEBUG
  console.log('=== DEBUG PROGRESS ===');
  console.log('URL course_id:', req.params.course_id);
  console.log('Parsed course_id:', course_id, typeof course_id);
  console.log('user_id:', user_id, typeof user_id);
  console.log('======================');

  const sql = `SELECT chapters_completed FROM learning_progress WHERE user_id = ? AND course_id = ?`;
  db.query(sql, [user_id, course_id], (err, results) => {
    if (err) {
      console.error('Lỗi DB:', err);
      return res.status(500).json({ success: false });
    }

    console.log('DB Raw Results:', results);
    console.log('DB Result[0]:', results[0]);

   let chapters = [];
if (results[0]?.chapters_completed) {
  const data = results[0].chapters_completed;
  chapters = Array.isArray(data) ? data.map(id => Number(id)) : [];
  console.log('Parsed chapters_completed:', chapters);
}

    res.json({ success: true, data: chapters });
  });
};
// controllers/userProgressController.js
exports.completeChapter = (req, res) => {
  const { course_id, chapter_id } = req.body;
  const user_id = req.user.id;

  if (!course_id || !chapter_id) {
    return res.status(400).json({ success: false, message: 'Thiếu dữ liệu' });
  }

  const sql = `
    INSERT INTO learning_progress (user_id, course_id, chapters_completed, updated_at)
    VALUES (?, ?, JSON_ARRAY(?), NOW())
    ON DUPLICATE KEY UPDATE 
      chapters_completed = CASE 
        WHEN JSON_CONTAINS(chapters_completed, ?) THEN chapters_completed
        ELSE JSON_ARRAY_APPEND(chapters_completed, '$', ?)
      END,
      updated_at = NOW()
  `;

  db.query(sql, [user_id, course_id, chapter_id, JSON.stringify([chapter_id]), chapter_id], (err) => {
    if (err) {
      console.error('Lỗi lưu tiến độ:', err);
      return res.status(500).json({ success: false });
    }
    res.json({ success: true });
  });
};