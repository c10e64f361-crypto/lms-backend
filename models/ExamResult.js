// models/ExamResult.js
const db = require('../config/db');

const ExamResult = {
  submit: (data, callback) => {
    const { user_id, exam_id, score, total_questions, correct_answers, answers } = data;

    // Lưu kết quả
    const resultSql = `
      INSERT INTO exam_results (user_id, exam_id, score, total_questions, correct_answers)
      VALUES (?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        score = VALUES(score),
        correct_answers = VALUES(correct_answers)
    `;
    db.query(resultSql, [user_id, exam_id, score, total_questions, correct_answers], (err, result) => {
      if (err) return callback(err);
      const resultId = result.insertId || result.affectedRows;

      // Xóa đáp án cũ
      db.query('DELETE FROM exam_user_answers WHERE result_id = ?', [resultId], () => {
        // Lưu đáp án mới
        const answerSql = 'INSERT INTO exam_user_answers (result_id, question_id, selected_answer, is_correct) VALUES ?';
        const answerValues = answers.map(a => [resultId, a.question_id, a.selected_answer, a.is_correct]);
        db.query(answerSql, [answerValues], callback);
      });
    });
  },

  getByUserExam: (userId, examId, callback) => {
    const sql = `
      SELECT er.*, 
             GROUP_CONCAT(eua.question_id, ':', eua.selected_answer, ':', eua.is_correct) as answer_details
      FROM exam_results er
      LEFT JOIN exam_user_answers eua ON er.id = eua.result_id
      WHERE er.user_id = ? AND er.exam_id = ?
      GROUP BY er.id
    `;
    db.query(sql, [userId, examId], (err, results) => {
      if (err || results.length === 0) return callback(err, null);
      callback(null, results[0]);
    });
  }
};

module.exports = ExamResult;