// models/Certificate.js
const db = require('../config/db');

const Certificate = {
  create: (cert, callback) => {
    db.query('INSERT INTO certificates SET ?', cert, callback);
  },
  getByUser: (userId, callback) => {
    db.query('SELECT * FROM certificates WHERE userId = ?', [userId], callback);
  }
};

module.exports = Certificate;