// routes/documentAdminRoutes.js
const express = require('express');
const documentAdminController = require('../controllers/documentAdminController');
const uploadDocument = require('../middleware/uploadDocument');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

const router = express.Router();

router.get('/', authMiddleware, adminMiddleware, documentAdminController.getAll);
router.post('/', authMiddleware, adminMiddleware, uploadDocument, documentAdminController.create);
router.put('/:id', authMiddleware, adminMiddleware, uploadDocument, documentAdminController.update);
router.delete('/:id', authMiddleware, adminMiddleware, documentAdminController.delete);

module.exports = router;