// controllers/questionBankController.js
const QuestionBank = require('../models/QuestionBank');

exports.getAll = (req, res) => {
  const filters = req.query;
  QuestionBank.getAll(filters, (err, result) => {
    if (err) return res.status(500).json({ success: false });
    res.json({ success: true, data: result.data, pagination: result.pagination });
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