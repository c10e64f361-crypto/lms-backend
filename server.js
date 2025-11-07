// server.js
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// PHỤC VỤ FILE TĨNH
app.use('/uploads', express.static('uploads'));
app.use('/videos', express.static(path.join(__dirname, 'videos')));

// === IMPORT ROUTES ===
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
const examRoutes = require('./routes/examRoutes'); // ← ĐẢM BẢO IMPORT TRƯỚC
const chapterRoutes = require('./routes/chapterRoutes');
const certificateRoutes = require('./routes/certificateRoutes');
const discussionRoutes = require('./routes/discussionRoutes');
const questionRoutes = require('./routes/questionRoutes');
const announcementRoutes = require('./routes/announcementRoutes');
const questionBankRoutes = require('./routes/questionBankRoutes');
const learningRoutes = require('./routes/learningRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const documentAdminRoutes = require('./routes/documentAdminRoutes');
const libraryRoutes = require('./routes/libraryRoutes');
const documentRoutes = require('./routes/documentRoutes');
const homeRoutes = require('./routes/homeRoutes');
const userRoutes = require('./routes/userRoutes');
const examQuestionRoutes = require('./routes/examQuestionRoutes');
const examResultRoutes = require('./routes/examResultRoutes');
const reportRoutes = require('./routes/reportRoutes');
const categoryRoutes = require('./routes/categoryRoutes');



// ... middleware khác

// === MOUNT ROUTES – `examRoutes` TRƯỚC CÁC ROUTE KHÁC ===
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/exams', examRoutes); // ← CHỈ MOUNT 1 LẦN, TRƯỚC CÁC ROUTE KHÁC
app.use('/api/categories', categoryRoutes);
app.use('/api/courses/:courseId/chapters', chapterRoutes);
app.use('/api/courses/:courseId/announcements', announcementRoutes);
app.use('/api/courses/:courseId/questions', questionRoutes);
app.use('/api/courses/:courseId/discussions', discussionRoutes);
app.use('/api/courses/:courseId/learning', learningRoutes);
app.use('/api/courses/:courseId/documents', documentRoutes);

app.use('/api/exams/:examId/questions', examQuestionRoutes);
app.use('/api/exams/:examId/results', examResultRoutes);

app.use('/api/users', userRoutes);
app.use('/api/question-bank', questionBankRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/admin/documents', documentAdminRoutes);
app.use('/api/library', libraryRoutes);
app.use('/api/home', homeRoutes);
app.use('/api/certificate', certificateRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/learning', learningRoutes); // ĐÚNG
app.use('/api/categories', categoryRoutes);
// === KHỞI ĐỘNG SERVER ===
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));