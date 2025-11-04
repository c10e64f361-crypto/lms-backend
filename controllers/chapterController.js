// controllers/chapterController.js
const Chapter = require('../models/Chapter');

exports.getByCourse = (req, res) => {
  const { courseId } = req.params;
  
  Chapter.getByCourse(courseId, (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Lỗi lấy chương' });
    }
    res.json({ success: true, data: results });
  });
};

exports.reorder = (req, res) => {
  const { courseId } = req.params;
  const newOrder = req.body.order; // [1, 2, 3, 4] - ID các chương theo thứ tự mới

  Chapter.reorder(courseId, newOrder, (err) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Lỗi sắp xếp chương' });
    }
    res.json({ success: true, message: 'Sắp xếp thành công' });
  });
};

// controllers/chapterController.js
exports.create = (req, res) => {
  const { courseId } = req.params;
  const { title, description, duration } = req.body;
  const video_url = req.file ? `/videos/${req.file.filename}` : null;

  const chapter = {
    course_id: courseId,
    title,
    description,
    video_url,
    duration,
    order_number: 999 // sẽ được reorder sau
  };

  Chapter.create(chapter, (err, result) => {
    if (err) {
      console.error('Lỗi tạo chương:', err);
      return res.status(500).json({ success: false, message: 'Lỗi tạo chương' });
    }
    res.status(201).json({
      success: true,
      data: { id: result.insertId, ...chapter }
    });
  });
};

exports.update = (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  Chapter.update(id, updates, (err) => {
    if (err) return res.status(500).json({ success: false, message: 'Lỗi cập nhật' });
    res.json({ success: true, message: 'Cập nhật thành công' });
  });
};

exports.delete = (req, res) => {
  const { id } = req.params;

  Chapter.delete(id, (err) => {
    if (err) return res.status(500).json({ success: false, message: 'Lỗi xóa' });
    res.json({ success: true, message: 'Xóa thành công' });
  });
};
exports.getByCourse = (req, res) => {
  const { courseId } = req.params;

  Chapter.getByCourse(courseId, (err, results) => {
    if (err) {
      console.error('Lỗi lấy chương:', err);
      return res.status(500).json({ success: false, message: 'Lỗi server' });
    }
    res.json({ success: true, data: results });
  });
};