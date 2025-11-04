// middleware/uploadMiddleware.js
const multer = require('multer');
const path = require('path');

const videoStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'videos/'),
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'video-' + unique + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: videoStorage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB
  fileFilter: (req, file, cb) => {
    const types = /mp4|mov|avi|mkv/;
    const ext = path.extname(file.originalname).toLowerCase();
    if (types.test(ext)) cb(null, true);
    else cb(new Error('Chỉ chấp nhận video'));
  }
});

module.exports = upload;