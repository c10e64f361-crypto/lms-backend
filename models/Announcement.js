// models/Announcement.js
const db = require('../config/db');

const Announcement = {
  getByCourse: (courseId, userId, callback) => {
    const sql = `
      SELECT 
        a.*,
        CASE WHEN ar.user_id IS NOT NULL THEN 1 ELSE 0 END as is_read
      FROM announcements a
      LEFT JOIN announcement_reads ar ON a.id = ar.announcement_id AND ar.user_id = ?
      WHERE a.course_id = ?
      ORDER BY a.created_at DESC
    `;
    db.query(sql, [userId, courseId], callback);
  },

  create: (data, callback) => {
    db.query('INSERT INTO announcements SET ?', data, callback);
  },

  markAsRead: (announcementId, userId, callback) => {
    db.query(
      'INSERT INTO announcement_reads (announcement_id, user_id) VALUES (?, ?) ON DUPLICATE KEY UPDATE read_at = NOW()',
      [announcementId, userId],
      callback
    );
  }
};

module.exports = Announcement;