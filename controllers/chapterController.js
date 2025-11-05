// controllers/chapterController.js
const Chapter = require('../models/Chapter');

// URL backend để tạo link video đầy đủ
const BASE_URL = process.env.BACKEND_URL || 'http://localhost:5000';

// controllers/chapterController.js
exports.getByCourse = (req, res) => {
  const { courseId } = req.params;

  Chapter.getByCourse(courseId, (err, results) => {
    if (err) {
      console.error('Lỗi lấy chương:', err);
      return res.status(500).json({ success: false, message: 'Lỗi server' });
    }

    // SỬA: DÙNG results → thêm full URL
    const chaptersWithFullUrl = results.map(chapter => ({
      ...chapter,
      video_url: chapter.video_url ? `${chapter.video_url}` : null
    }));

    // SỬA: DÙNG BIẾN ĐÃ KHAI BÁO
    res.json({ success: true, data: chaptersWithFullUrl });
  });
};
// === TẠO CHƯƠNG MỚI ===
exports.create = (req, res) => {
  const { courseId } = req.params;
  const { title, description, duration, parent_id } = req.body;

  // Xử lý duration
  const durationInt = duration ? parseInt(duration) : 0;
  if (isNaN(durationInt)) {
    return res.status(400).json({ success: false, message: 'Thời lượng không hợp lệ' });
  }

  // TẠO URL ĐẦY ĐỦ CHO VIDEO
  const video_url = req.file 
    ? `/uploads/videos/${req.file.filename}`
    : null;

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
      data: { 
        id: result.insertId, 
        ...chapter,
        video_url // Đảm bảo trả về URL đầy đủ
      }
    });
  });
};

// === CẬP NHẬT CHƯƠNG ===
exports.update = (req, res) => {
  const { id } = req.params;
  const { title, description, duration, parent_id } = req.body;

  const durationInt = duration ? parseInt(duration) : 0;
  if (isNaN(durationInt)) {
    return res.status(400).json({ success: false, message: 'Thời lượng không hợp lệ' });
  }

  const updates = {
    title,
    description: description || '',
    duration: durationInt,
    parent_id: parent_id || null
  };

  // CẬP NHẬT VIDEO MỚI → URL ĐẦY ĐỦ
  if (req.file) {
    updates.video_url = `/uploads/videos/${req.file.filename}`;
  }

  Chapter.update(id, updates, (err) => {
    if (err) {
      console.error('Lỗi cập nhật chương:', err);
      return res.status(500).json({ success: false, message: 'Lỗi cập nhật chương' });
    }
    res.json({ success: true, message: 'Cập nhật thành công' });
  });
};

// === XÓA CHƯƠNG ===
exports.delete = (req, res) => {
  const { id } = req.params;

  Chapter.delete(id, (err) => {
    if (err) {
      console.error('Lỗi xóa chương:', err);
      return res.status(500).json({ success: false, message: 'Lỗi xóa' });
    }
    res.json({ success: true, message: 'Xóa thành công' });
  });
};

// === SẮP XẾP LẠI THỨ TỰ ===
exports.reorder = (req, res) => {
  const { courseId } = req.params;
  const newOrder = req.body.order; // [1, 2, 3, 4]

  if (!Array.isArray(newOrder)) {
    return res.status(400).json({ success: false, message: 'Danh sách thứ tự không hợp lệ' });
  }

  Chapter.reorder(courseId, newOrder, (err) => {
    if (err) {
      console.error('Lỗi sắp xếp chương:', err);
      return res.status(500).json({ success: false, message: 'Lỗi sắp xếp chương' });
    }
    res.json({ success: true, message: 'Sắp xếp thành công' });
  });
};