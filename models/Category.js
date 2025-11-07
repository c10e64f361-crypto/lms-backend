// models/Category.js
const db = require('../config/db');

const Category = {
  getAll: (callback) => {
    const sql = 'SELECT * FROM categories ORDER BY id DESC';
    db.query(sql, callback);
  },

  create: (data, callback) => {
    const sql = 'INSERT INTO categories SET ?';
    db.query(sql, data, callback);
  },

  update: (id, data, callback) => {
    const sql = 'UPDATE categories SET ? WHERE id = ?';
    db.query(sql, [data, id], callback);
  },

  delete: (id, callback) => {
    const sql = 'DELETE FROM courses WHERE category_id = ?; DELETE FROM categories WHERE id = ?';
    db.query(sql, [id, id], callback);
  },

  getById: (id, callback) => {
    const sql = 'SELECT * FROM categories WHERE id = ?';
    db.query(sql, [id], callback);
  }
};

module.exports = Category;