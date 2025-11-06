// controllers/libraryController.js
const db = require('../config/db');
const BASE_URL = process.env.BACKEND_URL || 'http://localhost:5000';
exports.getAll = (req, res) => {
  const { page = 1, limit = 8, search = '', type } = req.query;
  const offset = (page - 1) * limit;

  let sql = `
    SELECT d.id, d.title, d.file_url, d.file_type, d.uploaded_at,
           u.fullName as uploaded_by_name
    FROM documents d
    JOIN users u ON d.uploaded_by = u.id
    WHERE 1=1
  `;
  let countSql = `SELECT COUNT(*) as total FROM documents d JOIN users u ON d.uploaded_by = u.id WHERE 1=1`;
  const params = [];

  if (search) {
    const like = `%${search}%`;
    sql += ` AND d.title LIKE ?`;
    countSql += ` AND d.title LIKE ?`;
    params.push(like);
  }

  if (type && type !== 'all') {
    sql += ` AND d.file_type = ?`;
    countSql += ` AND d.file_type = ?`;
    params.push(type);
  }

  db.query(countSql, params, (err, countResult) => {
    if (err) return res.status(500).json({ success: false });

    const total = countResult[0].total;
    const totalPages = Math.ceil(total / limit);

    sql += ` ORDER BY d.uploaded_at DESC LIMIT ? OFFSET ?`;
    const finalParams = [...params, parseInt(limit), offset];

    db.query(sql, finalParams, (err, results) => {
      if (err) return res.status(500).json({ success: false });

      const docs = results.map(d => ({
        ...d,
        file_url: `${BASE_URL}${d.file_url}`
      }));

      res.json({
        success: true,
        data: { documents: docs, totalPages, currentPage: parseInt(page), total }
      });
    });
  });
};