// controllers/learningController.js
const Question = require('../models/Question');
const LearningProgress = require('../models/LearningProgress');
// controllers/learningController.js
const Chapter = require('../models/Chapter'); // ← ĐÃ CÓ TỪ TASK 8

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


exports.getByUser = (req, res) => {
  const { userId } = req.params;
  LearningProgress.getByUser(userId, (err, results) => {
    if (err) return res.status(500).json({ success: false });

    const progress = results.map(row => {
      const completed = JSON.parse(row.chapters_completed || '[]').length;
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