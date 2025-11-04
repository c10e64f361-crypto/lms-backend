// controllers/questionController.js
const Question = require('../models/Question');

exports.getByCourse = (req, res) => {
  const { courseId } = req.params;
  Question.getByCourse(courseId, (err, results) => {
    if (err) return res.status(500).json({ success: false });
    res.json({ success: true, data: results });
  });
};

exports.create = (req, res) => {
  const { courseId } = req.params;
  const { title, options, correct_answer, points = 1 } = req.body;

  if (!title || !Array.isArray(options) || options.length !== 4 || !correct_answer) {
    return res.status(400).json({ success: false, message: 'Dữ liệu không hợp lệ' });
  }

  const data = { course_id: courseId, title, options, correct_answer, points };
  Question.create(data, (err, result) => {
    if (err) return res.status(500).json({ success: false });
    res.status(201).json({ success: true, data: { id: result.insertId, ...data } });
  });
};

exports.submitAnswer = (req, res) => {
  const { questionId } = req.params;
  const { selected_answer } = req.body;
  const user_id = req.user.id;

  Question.submitAnswer({ question_id: questionId, user_id, selected_answer }, (err) => {
    if (err) return res.status(500).json({ success: false });
    res.json({ success: true });
  });
};

exports.getUserAnswers = (req, res) => {
  const { courseId } = req.params;
  const user_id = req.user.id;
  Question.getUserAnswers(courseId, user_id, (err, results) => {
    if (err) return res.status(500).json({ success: false });
    res.json({ success: true, data: results });
  });
};