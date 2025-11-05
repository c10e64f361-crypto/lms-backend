// controllers/reportController.js
const db = require('../config/db');

exports.getStats = (req, res) => {
  const sql = `
    SELECT 
      (SELECT COUNT(*) FROM users) as totalUsers,
      (SELECT COUNT(*) FROM users WHERE status = 'active') as activeUsers,
      (SELECT COUNT(*) FROM learning_progress WHERE total_score = max_score) as completedCourses,
      (SELECT AVG(total_score / max_score * 100) FROM learning_progress) as avgCompletion
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('[reportController.getStats] Lỗi:', err);
      return res.status(500).json({ success: false });
    }
    const stats = results[0];
    stats.avgCompletion = stats.avgCompletion ? Math.round(stats.avgCompletion) : 0;
    res.json({ success: true, data: stats });
  });
};