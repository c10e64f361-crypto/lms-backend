// controllers/discussionController.js
const Discussion = require('../models/Discussion');

exports.getByCourse = (req, res) => {
  const { courseId } = req.params;
  Discussion.getByCourse(courseId, (err, results) => {
    if (err) return res.status(500).json({ success: false });
    
    // XÂY CÂY BÌNH LUẬN
    const comments = [];
    const map = {};
    results.forEach(row => {
      const comment = {
        id: row.id,
        content: row.content,
        user_name: row.user_name,
        likes: row.likes,
        created_at: row.created_at,
        replies: []
      };
      map[row.id] = comment;
      if (!row.parent_id) comments.push(comment);
      else map[row.parent_id].replies.push(comment);
    });
    
    res.json({ success: true, data: comments });
  });
};

exports.create = (req, res) => {
  const { courseId } = req.params;
  const { content, parent_id } = req.body;
  const userId = req.user.id; // từ authMiddleware

  const data = { course_id: courseId, user_id: userId, content, parent_id: parent_id || null };
  Discussion.create(data, (err, result) => {
    if (err) return res.status(500).json({ success: false });
    res.status(201).json({ success: true, data: { id: result.insertId, ...data } });
  });
};

exports.like = (req, res) => {
  const { id } = req.params;
  Discussion.like(id, (err) => {
    if (err) return res.status(500).json({ success: false });
    res.json({ success: true });
  });
};

exports.delete = (req, res) => {
  const { id } = req.params;
  Discussion.delete(id, (err) => {
    if (err) return res.status(500).json({ success: false });
    res.json({ success: true });
  });
};