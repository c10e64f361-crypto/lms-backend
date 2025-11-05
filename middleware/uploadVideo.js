// middleware/uploadVideo.js
const multer = require('multer');

const videoFilter = (req, file, cb) => {
  const allowedTypes = ['video/mp4', 'video/webm', 'video/ogg'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Chỉ chấp nhận video (mp4, webm, ogg)'), false);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/videos/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'chapter-' + uniqueSuffix + '.' + file.mimetype.split('/')[1]);
  }
});

const uploadVideo = multer({
  storage,
  fileFilter: videoFilter,
  limits: { fileSize: 100 * 1024 * 1024 } // 100MB
}).single('video');

module.exports = uploadVideo;