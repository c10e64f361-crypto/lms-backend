// models/Question.js
const db = require('../config/db');

const Question = {
  getByCourse: (courseId, callback) => {
    const sql = 'SELECT * FROM questions WHERE course_id = ? ORDER BY id';
    db.query(sql, [courseId], callback);
  },

  create: (data, callback) => {
    const sql = 'INSERT INTO questions SET ?';
    db.query(sql, data, callback);
  },

  submitAnswer: (data, callback) => {
    const { question_id, user_id, selected_answer } = data;
    db.query(
      'SELECT correct_answer FROM questions WHERE id = ?',
      [question_id],
      (err, result) => {
        if (err || result.length === 0) return callback(err || new Error('Không tìm thấy'));
        const is_correct = result[0].correct_answer === selected_answer ? 1 : 0;
        const answer = { question_id, user_id, selected_answer, is_correct };
        db.query(
          'INSERT INTO user_answers SET ? ON DUPLICATE KEY UPDATE selected_answer = ?, is_correct = ?',
          [answer, selected_answer, is_correct],
          callback
        );
      }
    );
  },

  getUserAnswers: (courseId, userId, callback) => {
    const sql = `
      SELECT q.*, ua.selected_answer, ua.is_correct
      FROM questions q
      LEFT JOIN user_answers ua ON q.id = ua.question_id AND ua.user_id = ?
      WHERE q.course_id = ?
    `;
    db.query(sql, [userId, courseId], callback);
  }
};

module.exports = Question;