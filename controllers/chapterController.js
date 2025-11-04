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
exports.getByCourse = (req, res) => {
  const { courseId } = req.params;

  Chapter.getByCourse(courseId, (err, tree) => {
    if (err) return res.status(500).json({ success: false });
    res.json({ success: true, data: tree });
  });
};
// controllers/chapterController.js
// controllers/chapterController.js
exports.create = (req, res) => {
  const { courseId } = req.params;
  const { title, description, duration, parent_id } = req.body;
  
  // CHUYỂN '' → 0 CHO duration
  const durationInt = duration ? parseInt(duration) : 0;
  if (isNaN(durationInt)) return res.status(400).json({ success: false, message: 'Thời lượng không hợp lệ' });

  const video_url = req.file ? `/videos/${req.file.filename}` : null;

  const chapter = {
    course_id: courseId,
    title,
    description: description || '',
    video_url,
    duration: durationInt,
    parent_id: parent_id || null,
    order_number: 999
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

// controllers/chapterController.js
exports.update = (req, res) => {
  const { id } = req.params;
  const { title, description, duration, parent_id } = req.body;

  // Xử lý duration
  const durationInt = duration ? parseInt(duration) : 0;
  if (isNaN(durationInt)) return res.status(400).json({ success: false, message: 'Thời lượng không hợp lệ' });

  const updates = {
    title,
    description: description || '',
    duration: durationInt,
    parent_id: parent_id || null
  };

  // Upload video mới (nếu có)
  if (req.file) {
    updates.video_url = `/videos/${req.file.filename}`;
  }

  Chapter.update(id, updates, (err) => {
    if (err) {
      console.error('Lỗi cập nhật chương:', err);
      return res.status(500).json({ success: false, message: 'Lỗi cập nhật chương' });
    }
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