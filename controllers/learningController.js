// controllers/learningController.js
const Question = require('../models/Question');
const LearningProgress = require('../models/LearningProgress');
// controllers/learningController.js
const Chapter = require('../models/Chapter'); // ← ĐÃ CÓ TỪ TASK 8
const db = require('../config/db');
exports.getResults = (req, res) => {
  const { courseId } = req.params;
  const userId = req.user.id;

  // 1. LẤY BÀI TẬP
  Question.getUserAnswers(courseId, userId, (err, questions) => {
    if (err) return res.status(500).json({ success: false });

    const totalQuestions = questions.length;
    const correct = questions.filter(q => q.is_correct).length;
    const quizScore = totalQuestions > 0 ? Math.round((correct / totalQuestions) * 100) : 0;

    // 2. LẤY SỐ CHƯƠNG THỰC TẾ
    Chapter.getByCourse(courseId, (err, chapters) => {
      if (err) return res.status(500).json({ success: false });

      const totalChapters = chapters.length; // ← SỐ CHƯƠNG THỰC TẾ

      // 3. LẤY TIẾN ĐỘ USER
      LearningProgress.getByUserCourse(userId, courseId, (err, progress) => {
        if (err) return res.status(500).json({ success: false });

        const completedChapters = progress 
          ? (Array.isArray(progress.chapters_completed) ? progress.chapters_completed.length : 0)
          : 0;

        const completion = totalChapters > 0 ? Math.round((completedChapters / totalChapters) * 100) : 0;
        const badge = completion === 100 ? 'Hoàn thành khóa học' : null;

        res.json({
          success: true,
          data: {
            quiz_score: quizScore,
            quiz_correct: correct,
            quiz_total: totalQuestions,
            completion_percent: completion,
            completed_chapters: completedChapters,
            total_chapters: totalChapters, // ← CHÍNH XÁC
            badge
          }
        });
      });
    });
  });
};

// controllers/learningController.js
exports.getCertificates = (req, res) => {
  const userId = req.user.id;
  const sql = `
    SELECT 
      lp.course_id,
      c.title as course_title,
      lp.updated_at as issued_at,
      'Công khai' as type,
      CONCAT('CH', lp.user_id, lp.course_id) as code
    FROM learning_progress lp
    JOIN courses c ON lp.course_id = c.id
    WHERE lp.user_id = ? AND lp.total_score = lp.max_score
    ORDER BY lp.updated_at DESC
  `;

  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json({ success: false });
    res.json({ success: true, data: results });
  });
};
// controllers/learningController.js
exports.getByUser = (req, res) => {
  const { userId } = req.params;
  LearningProgress.getByUser(userId, (err, results) => {
    if (err) return res.status(500).json({ success: false });

    const progress = results.map(row => {
      let completed = 0;
      try {
        const chapters = JSON.parse(row.chapters_completed || '[]');
        completed = Array.isArray(chapters) ? chapters.length : 0;
      } catch (e) {
        console.error('Lỗi parse JSON:', row.chapters_completed);
        completed = 0;
      }

      const completion = row.total_chapters > 0 ? Math.round((completed / row.total_chapters) * 100) : 0;
      const score = row.max_score > 0 ? Math.round((row.total_score / row.max_score) * 100) : 0;

      return {
        course_id: row.course_id,
        course_title: row.course_title,
        completed_chapters: completed,
        total_chapters: row.total_chapters,
        completion_percent: completion,
        quiz_score: score,
        badge: row.badge
      };
    });

    res.json({ success: true, data: progress });
  });
};
// controllers/learningController.js
exports.getCompletionChart = (req, res) => {
  const { filter = 'month' } = req.query;
  LearningProgress.getCompletionStats(filter, (err, data) => {
    if (err) {
      console.error('[learningController.getCompletionChart] Lỗi:', err);
      return res.status(500).json({ success: false, message: 'Lỗi lấy dữ liệu biểu đồ' });
    }
    res.json({ success: true, data: data || [] });
  });
};
// controllers/learningController.js
exports.getAverageScoreChart = (req, res) => {
  const { filter = 'month' } = req.query;
  LearningProgress.getAverageScoreStats(filter, (err, data) => {
    if (err) return res.status(500).json({ success: false });
    res.json({ success: true, data });
  });
};
exports.getResults = (req, res) => {
  const { courseId } = req.params;
  const userId = req.user.id;

  Question.getUserAnswers(courseId, userId, (err, questions) => {
    if (err) return res.status(500).json({ success: false });

    const totalQuestions = questions.length;
    const correct = questions.filter(q => q.is_correct).length;
    const score = totalQuestions > 0 ? Math.round((correct / totalQuestions) * 100) : 0;

    LearningProgress.getByUserCourse(userId, courseId, (err, progress) => {
      if (err) return res.status(500).json({ success: false });

      const completedChapters = progress 
        ? (progress.chapters_completed ? JSON.parse(progress.chapters_completed).length : 0)
        : 0;
      const totalChapters = 10;
      const completion = totalChapters > 0 ? Math.round((completedChapters / totalChapters) * 100) : 0;
      const badge = completion === 100 ? 'Hoàn thành khóa học' : null;

     // controllers/learningController.js
res.json({
  success: true,
  data: {
    quiz_score: score,
    quiz_correct: correct,
    quiz_total: totalQuestions,
    completion_percent: completion,
    completed_chapters: completedChapters,
    total_chapters: totalChapters,
    badge
  }
});
    });
  });
};