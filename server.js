// server.js
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
const examRoutes = require('./routes/examRoutes');
const chapterRoutes = require('./routes/chapterRoutes');
const certificateRoutes = require('./routes/certificateRoutes');
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
app.use('/api/certificates', certificateRoutes);
// server.js

// server.js

app.use('/api/courses', chapterRoutes); // Nested route
// server.js (thêm dòng)


app.use('/api/courses/:courseId/chapters', chapterRoutes);
app.use('/api/auth', authRoutes); // ← THÊM DÒNG NÀY
app.use('/api/courses', courseRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));