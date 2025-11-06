// controllers/documentController.js
const db = require('../config/db');
const BASE_URL = process.env.BACKEND_URL || 'http://localhost:5000';

// LẤY TÀI LIỆU THEO KHÓA HỌC
exports.getByCourse = (req, res) => {
  const { courseId } = req.params;
  const sql = 'SELECT id, title, file_url, file_type, uploaded_at FROM documents WHERE course_id = ? ORDER BY uploaded_at DESC';

  db.query(sql, [courseId], (err, results) => {
    if (err) return res.status(500).json({ success: false });
    const docs = results.map(d => ({
      ...d,
      file_url: `${BASE_URL}${d.file_url}`
    }));
    res.json({ success: true, data: docs });
  });
};

// TẢI LÊN TÀI LIỆU
exports.upload = (req, res) => {
  const { courseId } = req.params;
  const { title } = req.body;
  if (!req.file) return res.status(400).json({ success: false, message: 'Vui lòng chọn file' });

  const file_url = `/uploads/documents/${req.file.filename}`;
  const file_type = req.file.mimetype.includes('pdf') ? 'pdf' : req.file.mimetype.includes('word') ? 'docx' : 'pptx';

  const sql = 'INSERT INTO documents (course_id, title, file_url, file_type) VALUES (?, ?, ?, ?)';
  db.query(sql, [courseId, title, file_url, file_type], (err, result) => {
    if (err) return res.status(500).json({ success: false });
    res.json({ 
      success: true, 
      data: { 
        id: result.insertId, 
        title, 
        file_url: `${BASE_URL}${file_url}`, 
        file_type 
      }
    });
  });
};

// XÓA TÀI LIỆU
exports.delete = (req, res) => {
  const { id } = req.params;
  db.query('SELECT file_url FROM documents WHERE id = ?', [id], (err, results) => {
    if (err || !results[0]) return res.status(500).json({ success: false });
    const filePath = path.join(__dirname, '..', results[0].file_url.replace(BASE_URL, ''));
    fs.unlink(filePath, () => {});

    db.query('DELETE FROM documents WHERE id = ?', [id], (err) => {
      if (err) return res.status(500).json({ success: false });
      res.json({ success: true });
    });
  });
};