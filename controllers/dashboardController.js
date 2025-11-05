// controllers/dashboardController.js
const db = require('../config/db');

exports.getOverview = (req, res) => {
  const sql = `
    SELECT 
      (SELECT COUNT(*) FROM users) as totalUsers,
      (SELECT COUNT(*) FROM users WHERE status = 'active') as activeUsers,
      (SELECT COUNT(*) FROM learning_progress WHERE total_score = max_score) as completedCourses,
      (SELECT COUNT(DISTINCT u.id) FROM learning_progress lp JOIN users u ON lp.user_id = u.id WHERE lp.total_score = lp.max_score) as certificateUsers,
      (SELECT AVG(total_score / max_score * 100) FROM learning_progress) as avgScore
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('[dashboardController.getOverview] Lỗi:', err);
      return res.status(500).json({ success: false });
    }
    const stats = results[0];
    stats.avgScore = stats.avgScore ? Math.round(stats.avgScore) : 0;
    res.json({ success: true, data: stats });
  });
};