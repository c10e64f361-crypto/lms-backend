// controllers/questionController.js
const Question = require('../models/Question');

exports.getByCourse = (req, res) => {
  const { courseId } = req.params;
  Question.getByCourse(courseId, (err, results) => {
    if (err) return res.status(500).json({ success: false, message: err.message });
    res.json({ success: true, data: results });
  });
};

exports.create = (req, res) => {
  const { courseId } = req.params;
  const { title, options, correct_answer, points = 1 } = req.body;

  // Validate dữ liệu đầu vào
  if (!title || !Array.isArray(options) || options.length !== 4 || !correct_answer) {
    return res.status(400).json({ 
      success: false, 
      message: 'Dữ liệu không hợp lệ: cần title, options (4 phần tử), correct_answer' 
    });
  }

  // CHUYỂN ARRAY OPTIONS THÀNH JSON TRƯỚC KHI GỬI VÀO MODEL
  const data = { 
    course_id: courseId, 
    title, 
    options: JSON.stringify(options), // ← CHỈ SỬA DÒNG NÀY
    correct_answer, 
    points 
  };

  Question.create(data, (err, result) => {
    if (err) {
      console.error('Create Question Error:', err);
      return res.status(500).json({ success: false, message: 'Lỗi tạo câu hỏi' });
    }

    // Trả về dữ liệu đúng định dạng (options là array)
    res.status(201).json({ 
      success: true, 
      data: { 
        id: result.insertId, 
        course_id: courseId,
        title,
        options, // ← Trả về array, không phải JSON string
        correct_answer,
        points
      } 
    });
  });
};

exports.submitAnswer = (req, res) => {
  const { questionId } = req.params;
  const { selected_answer } = req.body;
  const user_id = req.user.id;

  if (!selected_answer) {
    return res.status(400).json({ success: false, message: 'Chưa chọn đáp án' });
  }

  Question.submitAnswer({ question_id: questionId, user_id, selected_answer }, (err) => {
    if (err) return res.status(500).json({ success: false, message: err.message });
    res.json({ success: true, message: 'Nộp đáp án thành công' });
  });
};

exports.getUserAnswers = (req, res) => {
  const { courseId } = req.params;
  const user_id = req.user.id;

  Question.getUserAnswers(courseId, user_id, (err, results) => {
    if (err) return res.status(500).json({ success: false, message: err.message });
    res.json({ success: true, data: results });
  });
};