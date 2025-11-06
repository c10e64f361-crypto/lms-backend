// controllers/examController.js
const Exam = require('../models/Exam');
const db = require('../config/db');
// controllers/examController.js
exports.getAll = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search || '';
  const status = req.query.status || '';

  Exam.getAllWithFilters({ page, limit, search, status }, (err, result) => {
    if (err) return res.status(500).json({ success: false });

    // TỰ ĐỘNG CẬP NHẬT TRẠNG THÁI
    const now = new Date();
    const updatedExams = result.data.map(exam => {
      const start = new Date(exam.start_time);
      const end = new Date(exam.end_time);

      let newStatus = exam.status;
      if (now < start) newStatus = 'Chưa mở';
      else if (now >= start && now <= end) newStatus = 'Đang mở';
      else if (now > end) newStatus = 'Đã kết thúc';

      if (exam.status !== newStatus) {
        // Cập nhật DB (tùy chọn)
        Exam.updateStatus(exam.id, newStatus, () => {});
      }

      return { ...exam, status: newStatus };
    });

    res.json({ 
      success: true, 
      data: updatedExams, 
      pagination: result.pagination 
    });
  });
};
exports.create = (req, res) => {
  const exam = req.body;
  Exam.create(exam, (err, result) => {
    if (err) return res.status(500).json({ success: false });
    res.status(201).json({ success: true, data: { id: result.insertId, ...exam } });
  });
};

exports.update = (req, res) => {
  const { id } = req.params;
  const exam = req.body;
  Exam.update(id, exam, (err) => {
    if (err) return res.status(500).json({ success: false });
    res.json({ success: true });
  });
};

exports.delete = (req, res) => {
  const { id } = req.params;
  Exam.delete(id, (err) => {
    if (err) return res.status(500).json({ success: false });
    res.json({ success: true });
  });
};
// controllers/examController.js
// controllers/examController.js
exports.getMyExams = (req, res) => {
  const userId = req.user.id;
  const { page = 1, limit = 20, search = '', year = '' } = req.query;
  const offset = (page - 1) * limit;

  let sql = `
    SELECT 
      e.id,
      e.title AS wave_name,
      e.title AS exam_name,
      e.start_time,
      e.end_time,
      e.duration,
      e.max_attempts AS attempts_allowed,
      e.scoring_method,
      er.score
    FROM exam_results er
    JOIN exams e ON er.exam_id = e.id
    WHERE er.user_id = ? AND er.score IS NOT NULL
  `;
  let countSql = `SELECT COUNT(*) as total FROM exam_results er WHERE er.user_id = ? AND er.score IS NOT NULL`;
  const params = [userId];
  const countParams = [userId];

  if (search) {
    sql += ` AND e.title LIKE ?`;
    const like = `%${search}%`;
    params.push(like);
  }

  if (year) {
    sql += ` AND YEAR(e.start_time) = ?`;
    params.push(year);
    countParams.push(year);
  }

  db.query(countSql, countParams, (err, countResult) => {
    if (err) return res.status(500).json({ success: false });

    const total = countResult[0].total;
    const totalPages = Math.ceil(total / limit);

    sql += ` ORDER BY er.submitted_at DESC LIMIT ? OFFSET ?`;
    params.push(parseInt(limit), offset);

    db.query(sql, params, (err, results) => {
      if (err) return res.status(500).json({ success: false });

      res.json({
        success: true,
        data: { exams: results, totalPages, currentPage: parseInt(page), total }
      });
    });
  });
};
// controllers/examController.js
exports.getById = (req, res) => {
  const { id } = req.params;
  Exam.getById(id, (err, result) => {
    if (err || !result) return res.status(404).json({ success: false, message: 'Không tìm thấy kỳ thi' });
    res.json({ success: true, data: result });
  });
};