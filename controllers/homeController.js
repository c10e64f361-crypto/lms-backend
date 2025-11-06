// controllers/homeController.js
const db = require('../config/db');
const BASE_URL = process.env.BACKEND_URL || 'http://localhost:5000';

// === KHÓA HỌC NỔI BẬT ===
exports.getFeatured = (req, res) => {
  const sql = `
    SELECT 
      c.id, c.title, c.thumbnail, c.description,
      COUNT(lp.user_id) as enrolled_count
    FROM courses c
    LEFT JOIN learning_progress lp ON c.id = lp.course_id
    GROUP BY c.id
    ORDER BY enrolled_count DESC
    LIMIT 6
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Lỗi lấy khóa học nổi bật:', err);
      return res.status(500).json({ success: false });
    }

    const featured = results.map(c => ({
      ...c,
      thumbnail: c.thumbnail ? `${BASE_URL}${c.thumbnail}` : null
    }));

    res.json({ success: true, data: featured });
  });
};

// === DANH MỤC ===
exports.getCategories = (req, res) => {
  const sql = `
    SELECT level as name, COUNT(*) as course_count
    FROM courses 
    GROUP BY level
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Lỗi lấy danh mục:', err);
      return res.status(500).json({ success: false });
    }
    res.json({ success: true, data: results });
  });
};

// === KHÓA HỌC GẦN ĐÂY ===
exports.getRecent = (req, res) => {
  const userId = req.user.id;
  const sql = `
    SELECT 
      c.id, c.title, c.thumbnail, lp.chapters_completed
    FROM learning_progress lp
    JOIN courses c ON lp.course_id = c.id
    WHERE lp.user_id = ?
    ORDER BY lp.updated_at DESC
    LIMIT 4
  `;

  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error('Lỗi lấy khóa học gần đây:', err);
      return res.status(500).json({ success: false });
    }

    const recent = results.map(c => {
      let completed = 0;
      try {
        const chapters = c.chapters_completed || [];
        completed = Array.isArray(chapters) ? chapters.length : 0;
      } catch (e) { /* ignore */ }
      return {
        ...c,
        thumbnail: c.thumbnail ? `${BASE_URL}${c.thumbnail}` : null,
        completed_chapters: completed
      };
    });

    res.json({ success: true, data: recent });
  });
};