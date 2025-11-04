// models/Exam.js
const db = require('../config/db');

const Exam = {
  getAll: (callback) => {
    db.query('SELECT * FROM exams', callback);
  },
  create: (exam, callback) => {
    db.query('INSERT INTO exams SET ?', exam, callback);
  }
};

module.exports = Exam;