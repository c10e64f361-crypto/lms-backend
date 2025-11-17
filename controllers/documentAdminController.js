// controllers/documentAdminController.js
const db = require('../config/db');
const fs = require('fs');
const path = require('path');
const BASE_URL = process.env.BACKEND_URL || 'http://localhost:5000';

// controllers/documentController.js


exports.getAll = (req, res) => {
  const { page = 1, limit = 10, search = '' } = req.query;
  const offset = (page - 1) * limit;

  let where = '';
  let params = [];

  if (search) {
    where = `WHERE d.title LIKE ? OR u.fullName LIKE ?`;
    const like = `%${search}%`;
    params.push(like, like);
  }

  const countQuery = `
    SELECT COUNT(*) as total 
    FROM documents d
    JOIN users u ON d.uploaded_by = u.id
    ${where}
  `;

  const dataQuery = `
    SELECT d.*, u.fullName as uploaded_by_name
    FROM documents d
    JOIN users u ON d.uploaded_by = u.id
    ${where}
    ORDER BY d.uploaded_at DESC
    LIMIT ? OFFSET ?
  `;

  db.query(countQuery, params, (err, countResult) => {
    if (err) {
      console.error('Lỗi đếm tài liệu:', err);
      return res.status(500).json({ success: false, message: 'Lỗi server' });
    }

    const total = countResult[0].total;
    const totalPages = Math.ceil(total / limit) || 1;

    db.query(dataQuery, [...params, parseInt(limit), offset], (err, results) => {
      if (err) {
        console.error('Lỗi lấy tài liệu:', err);
        return res.status(500).json({ success: false, message: 'Lỗi server' });
      }

      const docs = results.map(d => ({
        ...d,
        file_url: `${BASE_URL}${d.file_url}`
      }));

      res.json({
        success: true,
        data: docs,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          totalPages
        }
      });
    });
  });
};
// TẠO MỚI
exports.create = (req, res) => {
  const { title } = req.body;
  const uploaded_by = req.user.id;
  const file_url = `/uploads/documents/${req.file.filename}`;
  const file_type = req.file.mimetype.includes('pdf') ? 'pdf' 
                   : req.file.mimetype.includes('word') ? 'docx' : 'pptx';

  const sql = 'INSERT INTO documents (title, file_url, file_type, uploaded_by) VALUES (?, ?, ?, ?)';
  db.query(sql, [title, file_url, file_type, uploaded_by], (err, result) => {
    if (err) return res.status(500).json({ success: false });
    res.json({ 
      success: true, 
      data: { 
        id: result.insertId, 
        title, 
        file_url: `${BASE_URL}${file_url}`, 
        file_type, 
        uploaded_by_name: req.user.fullName 
      }
    });
  });
};

// CẬP NHẬT
exports.update = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const updates = { title };

  if (req.file) {
    // XÓA FILE CŨ
    db.query('SELECT file_url FROM documents WHERE id = ?', [id], (err, results) => {
      if (results[0]?.file_url) {
        const oldPath = path.join(__dirname, '..', results[0].file_url.replace(BASE_URL, ''));
        fs.unlink(oldPath, () => {});
      }
    });
    updates.file_url = `/uploads/documents/${req.file.filename}`;
    updates.file_type = req.file.mimetype.includes('pdf') ? 'pdf' 
                       : req.file.mimetype.includes('word') ? 'docx' : 'pptx';
  }

  const sql = 'UPDATE documents SET ? WHERE id = ?';
  db.query(sql, [updates, id], (err) => {
    if (err) return res.status(500).json({ success: false });
    res.json({ success: true, message: 'Cập nhật thành công' });
  });
};

// XÓA
exports.delete = (req, res) => {
  const { id } = req.params;

  db.query('SELECT file_url FROM documents WHERE id = ?', [id], (err, results) => {
    if (err || !results[0]) return res.status(500).json({ success: false });

    const filePath = path.join(__dirname, '..', results[0].file_url.replace(BASE_URL, ''));
    fs.unlink(filePath, () => {});

    db.query('DELETE FROM documents WHERE id = ?', [id], (err) => {
      if (err) return res.status(500).json({ success: false });
      res.json({ success: true, message: 'Xóa thành công' });
    });
  });
};