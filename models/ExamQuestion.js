// models/ExamQuestion.js
const db = require('../config/db');

const ExamQuestion = {
  getByExam: (examId, callback) => {
    const sql = 'SELECT * FROM exam_questions WHERE exam_id = ? ORDER BY id';
    db.query(sql, [examId], callback);
  },

  create: (data, callback) => {
    const sql = 'INSERT INTO exam_questions SET ?';
    db.query(sql, data, callback);
  },

  delete: (id, callback) => {
    db.query('DELETE FROM exam_questions WHERE id = ?', [id], callback);
  }
};

module.exports = ExamQuestion;