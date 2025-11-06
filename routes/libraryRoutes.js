// routes/libraryRoutes.js
const express = require('express');
const libraryController = require('../controllers/libraryController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, libraryController.getAll);

module.exports = router;