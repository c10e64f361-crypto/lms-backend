// controllers/announcementController.js
const Announcement = require('../models/Announcement');

exports.getByCourse = (req, res) => {
  const { courseId } = req.params;
  const userId = req.user.id; // từ authMiddleware

  Announcement.getByCourse(courseId, userId, (err, results) => {
    if (err) return res.status(500).json({ success: false });
    res.json({ success: true, data: results });
  });
};

exports.create = (req, res) => {
  const { courseId } = req.params;
  const { title, content } = req.body;

  const data = { course_id: courseId, title, content };
  Announcement.create(data, (err, result) => {
    if (err) return res.status(500).json({ success: false });
    res.status(201).json({ success: true, data: { id: result.insertId, ...data } });
  });
};

exports.markAsRead = (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  Announcement.markAsRead(id, userId, (err) => {
    if (err) return res.status(500).json({ success: false });
    res.json({ success: true });
  });
};