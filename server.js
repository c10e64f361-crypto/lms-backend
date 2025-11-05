// server.js
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
const examRoutes = require('./routes/examRoutes');
const chapterRoutes = require('./routes/chapterRoutes');
const certificateRoutes = require('./routes/certificateRoutes');
const discussionRoutes = require('./routes/discussionRoutes');
const questionRoutes = require('./routes/questionRoutes');
const announcementRoutes = require('./routes/announcementRoutes');
const questionBankRoutes = require('./routes/questionBankRoutes');
// server.js
const learningRoutes = require('./routes/learningRoutes');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/videos', express.static(path.join(__dirname, 'videos')));
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/exams', examRoutes);
// server.js
const examQuestionRoutes = require('./routes/examQuestionRoutes');
app.use('/api/exams/:examId/questions', examQuestionRoutes);
// server.js
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);


// server.js
const examResultRoutes = require('./routes/examResultRoutes');
app.use('/api/exams/:examId/results', examResultRoutes);
app.use('/api/question-bank', questionBankRoutes);
app.use('/api/exams', examRoutes);
app.use('/api/courses/:courseId/announcements', announcementRoutes);

app.use('/api/courses/:courseId/learning', learningRoutes);
app.use('/api/courses/:courseId/questions', questionRoutes);
app.use('/api/courses', chapterRoutes); // Nested route
// server.js
const dashboardRoutes = require('./routes/dashboardRoutes');
app.use('/api/dashboard', dashboardRoutes);
// server.js
const homeRoutes = require('./routes/homeRoutes');
app.use('/api/home', homeRoutes);


app.use('/api/certificate', certificateRoutes);
const reportRoutes = require('./routes/reportRoutes');

app.use('/api/reports', reportRoutes); // THÊM DÒNG NÀY
app.use('/api/learning', learningRoutes); // ĐÚNG
// server.js (thêm dòng)


app.use('/api/courses/:courseId/discussions', discussionRoutes);
app.use('/api/courses/:courseId/chapters', chapterRoutes);
app.use('/api/auth', authRoutes); // ← THÊM DÒNG NÀY
app.use('/api/courses', courseRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));