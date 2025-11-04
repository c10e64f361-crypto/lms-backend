// controllers/examController.js
const Exam = require('../models/Exam');

exports.getAll = (req, res) => {
  Exam.getAll((err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

exports.create = (req, res) => {
  Exam.create(req.body, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Tạo kỳ thi thành công', id: result.insertId });
  });
};