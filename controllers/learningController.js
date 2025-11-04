// controllers/learningController.js
const Question = require('../models/Question');
const LearningProgress = require('../models/LearningProgress');

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