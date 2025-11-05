// controllers/homeController.js
const db = require('../config/db');

// URL backend để tạo link ảnh
const BASE_URL = process.env.BACKEND_URL || 'http://localhost:5000';

exports.getHomeData = (req, res) => {
  const userId = req.user?.id || null;

  // Các truy vấn SQL
  const queries = {
    featured: `
      SELECT 
        c.id, 
        c.title, 
        c.thumbnail, 
        c.description,
        COUNT(lp.user_id) as enrolled_count
      FROM courses c
      LEFT JOIN learning_progress lp ON c.id = lp.course_id
      GROUP BY c.id
      ORDER BY enrolled_count DESC
      LIMIT 6
    `,
    categories: `
      SELECT 
        level as name, 
        COUNT(*) as course_count
      FROM courses 
      GROUP BY level
    `,
    recent: userId ? `
      SELECT 
        c.id, 
        c.title, 
        c.thumbnail,
        lp.chapters_completed,
        lp.updated_at
      FROM learning_progress lp
      JOIN courses c ON lp.course_id = c.id
      WHERE lp.user_id = ?
      ORDER BY lp.updated_at DESC
      LIMIT 4
    ` : `SELECT NULL as id LIMIT 0`
  };

  // Thực hiện song song
  Promise.all([
    new Promise((resolve, reject) => {
      db.query(queries.featured, (err, results) => {
        if (err) return reject(err);
        // Thêm full URL cho ảnh
        const featured = results.map(course => ({
          ...course,
          thumbnail: course.thumbnail ? `${BASE_URL}${course.thumbnail}` : null
        }));
        resolve(featured);
      });
    }),
    new Promise((resolve, reject) => {
      db.query(queries.categories, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    }),
    userId 
      ? new Promise((resolve, reject) => {
          db.query(queries.recent, [userId], (err, results) => {
            if (err) return reject(err);
            // Xử lý chapters_completed (array từ MySQL)
            const recent = results.map(course => {
              let completed = 0;
              try {
                const chapters = course.chapters_completed || [];
                completed = Array.isArray(chapters) ? chapters.length : 0;
              } catch (e) {
                console.error('Lỗi parse chapters_completed:', e);
              }
              return {
                ...course,
                thumbnail: course.thumbnail ? `${BASE_URL}${course.thumbnail}` : null,
                completed_chapters: completed
              };
            });
            resolve(recent);
          });
        })
      : Promise.resolve([])
  ])
  .then(([featured, categories, recent]) => {
    res.json({
      success: true,
      data: {
        featured,
        categories,
        recent
      }
    });
  })
  .catch(err => {
    console.error('[homeController.getHomeData] Lỗi:', err);
    res.status(500).json({ 
      success: false, 
      message: 'Lỗi tải dữ liệu trang chủ' 
    });
  });
};