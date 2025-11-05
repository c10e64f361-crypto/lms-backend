// controllers/examQuestionController.js
const ExamQuestion = require('../models/ExamQuestion');

exports.getByExam = (req, res) => {
  const { examId } = req.params;
  ExamQuestion.getByExam(examId, (err, results) => {
    if (err) return res.status(500).json({ success: false });
    res.json({ success: true, data: results });
  });
};

exports.create = (req, res) => {
  const { examId } = req.params;
  const { question_text, option_a, option_b, option_c, option_d, correct_answer, points = 1 } = req.body;

  if (!question_text || !option_a || !option_b || !option_c || !option_d || !correct_answer) {
    return res.status(400).json({ success: false, message: 'Thiếu thông tin câu hỏi' });
  }

  const data = {
    exam_id: examId,
    question_text,
    option_a, option_b, option_c, option_d,
    correct_answer,
    points
  };

  ExamQuestion.create(data, (err, result) => {
    if (err) return res.status(500).json({ success: false });
    res.status(201).json({ success: true, data: { id: result.insertId, ...data } });
  });
};

exports.delete = (req, res) => {
  const { id } = req.params;
  ExamQuestion.delete(id, (err) => {
    if (err) return res.status(500).json({ success: false });
    res.json({ success: true });
  });
};