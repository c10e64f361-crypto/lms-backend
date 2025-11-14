// controllers/questionBankController.js
const QuestionBank = require('../models/QuestionBank');
const db = require('../config/db');
// controllers/questionBankController.js
exports.getAll = (req, res) => {
  const filters = req.query;
  QuestionBank.getAll(filters, (err, result) => {
    if (err) {
      console.error('Lỗi getAll:', err);
      return res.status(500).json({ success: false, message: 'Lỗi server' });
    }

    // BẢO ĐẢM TRẢ ĐÚNG CẤU TRÚC
    res.json({
      success: true,
      data: result.data,
      pagination: result.pagination || {
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 1
      }
    });
  });
};
// THÊM HÀM NÀY ĐỂ FRONTEND GỌI
exports.getQuestions = (req, res) => {
  const { search = '', topic = '', difficulty = '' } = req.query;

  const filters = {};
  if (search) filters.search = search;
  if (topic) filters.topic = topic;
  if (difficulty && difficulty !== 'Tất cả') filters.difficulty = difficulty;

  QuestionBank.getAll(filters, (err, result) => {
    if (err) {
      console.error('Lỗi lấy ngân hàng câu hỏi:', err);
      return res.status(500).json({ success: false, message: 'Lỗi server' });
    }
    res.json({ 
      success: true, 
      data: result.data // Trả về mảng câu hỏi
    });
  });
};

exports.create = (req, res) => {
  const data = req.body;
  QuestionBank.create(data, (err, result) => {
    if (err) return res.status(500).json({ success: false });
    res.status(201).json({ success: true, data: { id: result.insertId, ...data } });
  });
};

exports.update = (req, res) => {
  const { id } = req.params;
  const data = req.body;

  const sql = `
    UPDATE question_bank SET 
      question_text = ?, option_a = ?, option_b = ?, option_c = ?, option_d = ?,
      correct_answer = ?, category = ?, difficulty = ?
    WHERE id = ?
  `;

  const values = [
    data.question_text, data.option_a, data.option_b, data.option_c, data.option_d,
    data.correct_answer, data.category, data.difficulty, id
  ];

  db.query(sql, values, (err, result) => {
    if (err || result.affectedRows === 0) {
      return res.status(500).json({ success: false });
    }
    res.json({ success: true, data: { id, ...data } });
  });
};

exports.delete = (req, res) => {
  const { id } = req.params;
  QuestionBank.delete(id, (err) => {
    if (err) return res.status(500).json({ success: false });
    res.json({ success: true });
  });
};