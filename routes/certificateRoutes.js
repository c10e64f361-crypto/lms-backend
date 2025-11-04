// routes/certificateRoutes.js
const express = require('express');
const certificateController = require('../controllers/certificateController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, certificateController.create);

module.exports = router;