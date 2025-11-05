// controllers/examResultController.js
const Exam = require('../models/Exam'); // ← THÊM DÒNG NÀY
const ExamResult = require('../models/ExamResult');
const ExamQuestion = require('../models/ExamQuestion');

exports.submit = (req, res) => {
  const { examId } = req.params;
  const userId = req.user.id;
  const { answers } = req.body;

  console.log('[ExamResult] Nộp bài:', { examId, userId, answers });

  if (!answers || !Array.isArray(answers)) {
    return res.status(400).json({ success: false, message: 'Dữ liệu không hợp lệ' });
  }

  Exam.getById(examId, (err, exam) => {
    if (err || !exam) {
      console.error('[ExamResult] Không tìm thấy kỳ thi:', err);
      return res.status(404).json({ success: false, message: 'Kỳ thi không tồn tại' });
    }

    ExamResult.getByUserExam(userId, examId, (err, existingResult) => {
      if (err) {
        console.error('[ExamResult] Lỗi kiểm tra kết quả cũ:', err);
        return res.status(500).json({ success: false });
      }

      const attempts = existingResult ? 1 : 0;
      if (attempts >= exam.max_attempts) {
        return res.status(403).json({ 
          success: false, 
          message: `Bạn đã thi ${attempts} lần. Tối đa ${exam.max_attempts} lần.` 
        });
      }

      ExamQuestion.getByExam(examId, (err, questions) => {
        if (err || !questions) {
          console.error('[ExamResult] Lỗi lấy câu hỏi:', err);
          return res.status(500).json({ success: false });
        }

        let correct = 0;
        const processedAnswers = answers.map(ans => {
          const q = questions.find(q => q.id == ans.question_id);
          if (!q) return null;
          const isCorrect = q.correct_answer === ans.selected_answer ? 1 : 0;
          if (isCorrect) correct++;
          return {
            question_id: ans.question_id,
            selected_answer: ans.selected_answer,
            is_correct: isCorrect
          };
        }).filter(Boolean);

        const score = questions.length > 0 ? Math.round((correct / questions.length) * 100) : 0;

        ExamResult.submit({
          user_id: userId,
          exam_id: examId,
          score, total_questions: questions.length, correct_answers: correct,
          answers: processedAnswers
        }, (err) => {
          if (err) {
            console.error('[ExamResult] Lỗi lưu kết quả:', err);
            return res.status(500).json({ success: false });
          }
          res.json({ success: true, data: { score, correct, total: questions.length } });
        });
      });
    });
  });
};