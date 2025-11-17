// controllers/courseController.js
const Course = require('../models/Course');
const db = require('../config/db');
// === TASK 4: DÙNG getAllWithFilters ===
// controllers/courseController.js

// controllers/courseController.js
exports.getAll = (req, res) => {
  const { page = 1, limit = 10, category_id, search } = req.query;
  const offset = (page - 1) * limit;

  let sql = 'SELECT * FROM courses WHERE 1=1';
  let countSql = 'SELECT COUNT(*) as total FROM courses WHERE 1=1';
  const params = [];
  const countParams = [];

  // LỌC THEO DANH MỤC
  if (category_id) {
    sql += ' AND category_id = ?';
    countSql += ' AND category_id = ?';
    params.push(category_id);
    countParams.push(category_id);
  }

  // TÌM KIẾM THEO TITLE HOẶC CODE
  if (search) {
    const like = `%${search}%`;
    sql += ' AND (title LIKE ? OR code LIKE ?)';
    countSql += ' AND (title LIKE ? OR code LIKE ?)';
    params.push(like, like);
    countParams.push(like, like);
  }

  sql += ' ORDER BY id DESC LIMIT ? OFFSET ?';
  params.push(parseInt(limit), parseInt(offset));

  db.query(countSql, countParams, (err, countResult) => {
    if (err) return res.status(500).json({ success: false });
    const total = countResult[0].total;

    db.query(sql, params, (err, results) => {
      if (err) return res.status(500).json({ success: false });
      res.json({ 
        success: true, 
        data: results, 
        total,
        page: parseInt(page),
        totalPages: Math.ceil(total / limit)
      });
    });
  });
};

// ... các hàm create, update, delete của course

exports.create = (req, res) => {
  const { code, title, description, instructor, duration, level, start_date, end_date, price, category_id, tag } = req.body;
  
  // Upload ảnh (Multer)
  const thumbnail = req.file ? `/uploads/images/${req.file.filename}` : null;

  const course = {
    code,
    title,
    description,
    instructor,
    duration,
    level,
    start_date,
    end_date,
    price,
    category_id,
    tag,
    thumbnail
  };

  Course.create(course, (err, result) => {
    if (err) {
      console.error('Lỗi tạo khóa học:', err);
      return res.status(500).json({ success: false, message: 'Lỗi tạo khóa học' });
    }

    res.status(201).json({
      success: true,
      message: 'Tạo khóa học thành công',
      data: { id: result.insertId, ...course }
    });
  });
};

// controllers/courseController.js
exports.getOne = (req, res) => {
  const { id } = req.params;

  Course.findById(id, (err, result) => {
    if (err || result.length === 0) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy khóa học' });
    }
    res.json({ success: true, data: result[0] });
  });
};

// === SỬA KHÓA HỌC ===
exports.update = (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  
  // Upload ảnh mới (nếu có)
  if (req.file) {
    updates.thumbnail = `/uploads/images/${req.file.filename}`;
  }

  Course.update(id, updates, (err) => {
    if (err) {
      console.error('Lỗi sửa:', err);
      return res.status(500).json({ success: false, message: 'Lỗi sửa khóa học' });
    }
    res.json({ success: true, message: 'Sửa thành công' });
  });
};

// === XÓA KHÓA HỌC ===
exports.delete = (req, res) => {
  const { id } = req.params;

  Course.delete(id, (err) => {
    if (err) {
      console.error('Lỗi xóa:', err);
      return res.status(500).json({ success: false, message: 'Lỗi xóa khóa học' });
    }
    res.json({ success: true, message: 'Xóa thành công' });
  });
};



// controllers/courseController.js
exports.getLearningResults = (req, res) => {
  const courseId = req.params.id;
  const userId = req.user.id;

  db.query(
    `SELECT COUNT(*) as total FROM chapters WHERE course_id = ?`,
    [courseId],
    (err, chapterResult) => {
      if (err) return res.status(500).json({ success: false });

      const total_chapters = chapterResult[0]?.total || 0;

      db.query(
        `SELECT chapters_completed FROM learning_progress WHERE user_id = ? AND course_id = ?`,
        [userId, courseId],
        (err, progressResult) => {
          if (err) return res.status(500).json({ success: false });

          let completed_chapters = 0;
          if (progressResult[0]?.chapters_completed) {
            try {
              // LOẠI BỎ KHOẢNG TRẮNG + DẤU NGOẶC VUÔNG
              const raw = progressResult[0].chapters_completed.toString().trim();
              if (raw && raw !== '[]') {
                const cleaned = raw.replace(/\[|\]/g, '').trim();
                if (cleaned) {
                  completed_chapters = cleaned.split(',').map(id => id.trim()).filter(Boolean).length;
                }
              }
            } catch (e) {
              console.error('Lỗi parse chapters_completed:', e);
            }
          }

          const completion_percent = total_chapters > 0
            ? Math.round((completed_chapters / total_chapters) * 100)
            : 0;

          let badge = null;
          if (completion_percent === 100) badge = 'Hoàn thành khóa học';
          else if (completion_percent >= 80) badge = 'Học viên xuất sắc';
          else if (completion_percent >= 50) badge = 'Học viên chăm chỉ';

          res.json({
            success: true,
            data: {
              completed_chapters,
              total_chapters,
              completion_percent,
              badge
            }
          });
        }
      );
    }
  );
};


// API: Bấm "Vào học" → tăng 1 học viên (chỉ tăng 1 lần duy nhất)
exports.enrollCourse = (req, res) => {
  const userId = req.user.id;
  const courseId = req.params.id;

  // B1: Kiểm tra đã từng bấm vào học chưa
  db.query(
    'SELECT 1 FROM course_views WHERE user_id = ? AND course_id = ? LIMIT 1',
    [userId, courseId],
    (err, results) => {
      if (err) {
        console.error('Lỗi kiểm tra course_views:', err);
        return res.status(500).json({ success: false });
      }

      // Nếu đã từng bấm → không tăng nữa
      if (results.length > 0) {
        return res.json({ success: true, message: 'Đã ghi nhận trước đó' });
      }

      // B2: Ghi nhận lần đầu bấm vào học
      db.query(
        'INSERT INTO course_views (user_id, course_id, viewed_at) VALUES (?, ?, NOW())',
        [userId, courseId],
        (err) => {
          if (err) {
            console.error('Lỗi insert course_views:', err);
            return res.status(500).json({ success: false });
          }

          // B3: Tăng số học viên trong bảng courses
          db.query(
            'UPDATE courses SET students = students + 1 WHERE id = ?',
            [courseId],
            (err) => {
              if (err) {
                console.error('Lỗi tăng students:', err);
                return res.status(500).json({ success: false });
              }

              res.json({ success: true, message: 'Đã tham gia khóa học' });
            }
          );
        }
      );
    }
  );
};