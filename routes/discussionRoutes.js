// routes/discussionRoutes.js
const express = require('express');
const discussionController = require('../controllers/discussionController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router({ mergeParams: true });

router.get('/', authMiddleware, discussionController.getByCourse);
router.post('/', authMiddleware, discussionController.create);
router.post('/:id/like', authMiddleware, discussionController.like);
router.delete('/:id', authMiddleware, discussionController.delete);

module.exports = router;