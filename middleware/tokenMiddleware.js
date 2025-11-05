// middleware/tokenMiddleware.js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  let token;

  // 1. Ưu tiên header Authorization
  const authHeader = req.header('Authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.replace('Bearer ', '');
  }

  // 2. Nếu không có → lấy từ query
  if (!token && req.query.token) {
    token = req.query.token;
  }

  if (!token) {
    return res.status(401).json({ message: 'No token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};