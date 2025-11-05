// routes/courseRoutes.js
const express = require('express');
const courseController = require('../controllers/courseController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
// routes/courseRoutes.js
const uploadImage = require('../middleware/uploadImage');
const adminMiddleware = require('../middleware/adminMiddleware');
const router = express.Router();

router.get('/', authMiddleware, courseController.getAll);
router.post('/', authMiddleware, adminMiddleware, uploadImage, courseController.create);

// routes/courseRoutes.js
router.put('/:id', authMiddleware, adminMiddleware, uploadImage, courseController.update);
router.delete('/:id', authMiddleware, adminMiddleware, courseController.delete);
// routes/courseRoutes.js
router.get('/:id', authMiddleware, courseController.getOne);
module.exports = router;