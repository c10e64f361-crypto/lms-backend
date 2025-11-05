// controllers/certificateController.js
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const db = require('../config/db');
// controllers/certificateController.js
const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');
const fontkit = require('@pdf-lib/fontkit');

exports.getAll = (req, res) => {
  const sql = `
    SELECT 
      u.id as user_id, 
      u.fullName,
      c.id as course_id, 
      c.title as course_title,
      lp.updated_at as issued_at
    FROM learning_progress lp
    JOIN users u ON lp.user_id = u.id
    JOIN courses c ON lp.course_id = c.id
    WHERE lp.total_score = lp.max_score
    ORDER BY lp.updated_at DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('[certificateController.getAll] Lỗi:', err);
      return res.status(500).json({ success: false, message: 'Lỗi lấy danh sách chứng chỉ' });
    }
    res.json({ success: true, data: results });
  });
};


exports.generate = async (req, res) => {
  const { userId, courseId } = req.params;

  try {
    // 1. LẤY DỮ LIỆU
    const [userResult, courseResult, progressResult] = await Promise.all([
      new Promise((resolve, reject) => {
        db.query('SELECT fullName FROM users WHERE id = ?', [userId], (err, res) => err ? reject(err) : resolve(res));
      }),
      new Promise((resolve, reject) => {
        db.query('SELECT title FROM courses WHERE id = ?', [courseId], (err, res) => err ? reject(err) : resolve(res));
      }),
      new Promise((resolve, reject) => {
        db.query(
          'SELECT updated_at FROM learning_progress WHERE user_id = ? AND course_id = ? AND total_score = max_score',
          [userId, courseId],
          (err, res) => err ? reject(err) : resolve(res)
        );
      })
    ]);

    if (!userResult[0] || !courseResult[0] || !progressResult[0]) {
      return res.status(404).json({ success: false, message: 'Không đủ điều kiện cấp chứng chỉ' });
    }

    const fullName = userResult[0].fullName;
    const courseTitle = courseResult[0].title;
    const issuedDate = new Date(progressResult[0].updated_at).toLocaleDateString('vi-VN');

    // 2. TẠO MÃ XÁC THỰC
    const verifyCode = `${userId}-${courseId}-${Date.now()}`;
    const verifyUrl = `https://lms-quocphong.com/verify?code=${verifyCode}`;

    // 3. TẠO QR CODE
    const qrImageDataUrl = await QRCode.toDataURL(verifyUrl, { width: 150 });

    // 4. TẠO PDF + FONT TIẾNG VIỆT
    const pdfDoc = await PDFDocument.create();
    pdfDoc.registerFontkit(fontkit); // ĐĂNG KÝ FONTKIT

    const fontPath = path.join(__dirname, '../fonts/DejaVuSans.ttf');
    const fontBytes = fs.readFileSync(fontPath);
    const customFont = await pdfDoc.embedFont(fontBytes, { subset: true });

    const page = pdfDoc.addPage([850, 600]);
    const { width, height } = page.getSize();

    // Nền + viền
    page.drawRectangle({ x: 0, y: 0, width, height, color: rgb(0.98, 0.98, 0.99) });
    page.drawRectangle({ x: 30, y: 30, width: width - 60, height: height - 60, borderColor: rgb(0.2, 0.4, 0.8), borderWidth: 4 });

    // Tiêu đề
    page.drawText('CHỨNG CHỈ HOÀN THÀNH', { x: 50, y: height - 140, size: 38, color: rgb(0.15, 0.35, 0.75), font: customFont });
    page.drawText('___________________________', { x: 50, y: height - 150, size: 20, color: rgb(0.3, 0.5, 0.8) });

    // Tên học viên
    page.drawText('Cấp cho:', { x: 50, y: height - 200, size: 18, color: rgb(0.3, 0.3, 0.3), font: customFont });
    page.drawText(fullName, { x: 50, y: height - 240, size: 32, color: rgb(0, 0.2, 0.6), font: customFont });

    // Khóa học
    page.drawText('Đã hoàn thành xuất sắc khóa học:', { x: 50, y: height - 300, size: 16, color: rgb(0.3, 0.3, 0.3), font: customFont });
    page.drawText(courseTitle, { x: 50, y: height - 340, size: 22, color: rgb(0, 0.3, 0.6), font: customFont });

    // Ngày cấp
    page.drawText(`Ngày cấp: ${issuedDate}`, { x: 50, y: height - 400, size: 16, color: rgb(0.3, 0.3, 0.3), font: customFont });

    // QR Code
    const qrImageBytes = Uint8Array.from(atob(qrImageDataUrl.split(',')[1]), c => c.charCodeAt(0));
    const qrImage = await pdfDoc.embedPng(qrImageBytes);
    page.drawImage(qrImage, { x: width - 220, y: height - 380, width: 160, height: 160 });
    page.drawText('Quét mã QR để xác thực chứng chỉ', { x: width - 240, y: height - 410, size: 12, color: rgb(0.4, 0.4, 0.4), font: customFont });

    // Xuất PDF
    const pdfBytes = await pdfDoc.save();
   const safeFileName = `ChungChi_${userId}_${courseId}.pdf`;
res.setHeader('Content-Type', 'application/pdf');
res.setHeader('Content-Disposition', `attachment; filename="${safeFileName}"`);
    res.send(Buffer.from(pdfBytes));

  } catch (err) {
    console.error('Lỗi tạo chứng chỉ:', err);
    res.status(500).json({ success: false, message: 'Lỗi tạo chứng chỉ' });
  }
};