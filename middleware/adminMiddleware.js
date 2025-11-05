// middleware/adminMiddleware.js
const adminMiddleware = (req, res, next) => {
  if (!req.user || req.user.role !== 'Quản trị viên') {
    return res.status(403).json({ 
      success: false, 
      message: 'Truy cập bị từ chối. Yêu cầu quyền admin.' 
    });
  }
  next();
};

module.exports = adminMiddleware;