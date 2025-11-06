// controllers/questionBankController.js
const QuestionBank = require('../models/QuestionBank');

exports.getAll = (req, res) => {
  const filters = req.query;
  QuestionBank.getAll(filters, (err, result) => {
    if (err) return res.status(500).json({ success: false });
    res.json({ success: true, data: result.data, pagination: result.pagination });
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
  QuestionBank.update(id, data, (err) => {
    if (err) return res.status(500).json({ success: false });
    res.json({ success: true });
  });
};

exports.delete = (req, res) => {
  const { id } = req.params;
  QuestionBank.delete(id, (err) => {
    if (err) return res.status(500).json({ success: false });
    res.json({ success: true });
  });
};