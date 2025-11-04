// routes/courseRoutes.js
const express = require('express');
const courseController = require('../controllers/courseController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

router.get('/', authMiddleware, courseController.getAll);
router.post('/', authMiddleware, upload.single('thumbnail'), courseController.create);
// routes/courseRoutes.js
router.put('/:id', authMiddleware, upload.single('thumbnail'), courseController.update);
router.delete('/:id', authMiddleware, courseController.delete);
// routes/courseRoutes.js
router.get('/:id', authMiddleware, courseController.getOne);
module.exports = router;