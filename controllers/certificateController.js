// controllers/certificateController.js
const { PDFDocument, rgb } = require('pdf-lib');
const db = require('../config/db');
const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');
const fontkit = require('@pdf-lib/fontkit');

// === HÀM CHUYỂN TÊN KHÔNG DẤU (AN TOÀN 100%) ===
const sanitizeFileName = (name) => {
  return name
    .normalize('NFD')                   // Tách dấu
    .replace(/[\u0300-\u036f]/g, '')    // Xóa dấu
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .replace(/[^a-zA-Z0-9]/g, '_')      // Chỉ giữ chữ + số
    .replace(/_+/g, '_')                // Gộp dấu gạch dưới
    .trim();
};

// === LẤY DANH SÁCH CHỨNG CHỈ ===
exports.getAll = (req, res) => {
  const userId = req.user.id;

  const sql = `
    SELECT 
      c.id as course_id,
      c.title as course_title,
      c.code as course_code,
      lp.updated_at as issued_at
    FROM learning_progress lp
    JOIN courses c ON lp.course_id = c.id
    WHERE lp.user_id = ? AND lp.total_score = lp.max_score
    ORDER BY lp.updated_at DESC
  `;

  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error('[certificateController.getAll] Lỗi:', err);
      return res.status(500).json({ success: false, message: 'Lỗi server' });
    }
    res.json({ success: true, data: results });
  });
};

// === TẠO CHỨNG CHỈ PDF – HỖ TRỢ /me VÀ /:userId ===
exports.generate = async (req, res) => {
  let userId = req.params.userId;
  const courseId = req.params.courseId;

  // Hỗ trợ route /me
  if (userId === 'me' || !userId) {
    userId = req.user.id;
  }

  if (!userId || !courseId) {
    return res.status(400).json({ success: false, message: 'Thiếu thông tin' });
  }

  try {
    // LẤY DỮ LIỆU
    const [userRes, courseRes, progressRes] = await Promise.all([
      new Promise((resolve, reject) => db.query('SELECT fullName FROM users WHERE id = ?', [userId], (e, r) => e ? reject(e) : resolve(r))),
      new Promise((resolve, reject) => db.query('SELECT title, code FROM courses WHERE id = ?', [courseId], (e, r) => e ? reject(e) : resolve(r))),
      new Promise((resolve, reject) => db.query('SELECT updated_at FROM learning_progress WHERE user_id = ? AND course_id = ? AND total_score = max_score', [userId, courseId], (e, r) => e ? reject(e) : resolve(r)))
    ]);

    if (!userRes[0] || !courseRes[0] || !progressRes[0]) {
      return res.status(404).json({ success: false, message: 'Chưa hoàn thành khóa học' });
    }

    const fullName = userRes[0].fullName || 'Học viên';
    const courseTitle = courseRes[0].title;
    const courseCode = courseRes[0].code || '';
    const issuedDate = new Date(progressRes[0].updated_at).toLocaleDateString('vi-VN');

    // MÃ XÁC THỰC + QR
    const verifyCode = `CERT-${userId}-${courseId}-${Date.now()}`;
    const verifyUrl = `${process.env.APP_URL || 'http://localhost:3000'}/verify-certificate/${verifyCode}`;
    const qrImageDataUrl = await QRCode.toDataURL(verifyUrl, { width: 180 });

    // TẠO PDF
    const pdfDoc = await PDFDocument.create();
    pdfDoc.registerFontkit(fontkit);

    const fontPath = path.join(__dirname, '../fonts/DejaVuSans.ttf');
    const fontBytes = fs.readFileSync(fontPath);
    const customFont = await pdfDoc.embedFont(fontBytes, { subset: true });

    const page = pdfDoc.addPage([850, 600]);
    const { width, height } = page.getSize();

    // Nền + viền
    page.drawRectangle({ x: 0, y: 0, width, height, color: rgb(0.98, 0.98, 0.99) });
    page.drawRectangle({ x: 30, y: 30, width: width - 60, height: height - 60, borderColor: rgb(0.1, 0.4, 0.8), borderWidth: 6 });

    // Tiêu đề
    page.drawText('CHỨNG CHỈ HOÀN THÀNH', { x: 100, y: height - 130, size: 42, font: customFont, color: rgb(0.1, 0.3, 0.7) });
    page.drawText('_____________________________', { x: 100, y: height - 145, size: 20, color: rgb(0.3, 0.5, 0.8) });

    // Tên học viên
    page.drawText('CẤP CHO', { x: 100, y: height - 200, size: 20, color: rgb(0.3, 0.3, 0.3), font: customFont });
    page.drawText(fullName, { x: 100, y: height - 250, size: 38, color: rgb(0, 0.2, 0.6), font: customFont });

    // Khóa học
    page.drawText('ĐÃ HOÀN THÀNH XUẤT SẮC KHÓA HỌC', { x: 100, y: height - 320, size: 18, color: rgb(0.2, 0.2, 0.2), font: customFont });
    page.drawText(courseTitle, { x: 100, y: height - 370, size: 28, color: rgb(0, 0.3, 0.7), font: customFont });
    if (courseCode) {
      page.drawText(`Mã khóa: ${courseCode}`, { x: 100, y: height - 410, size: 16, color: rgb(0.4, 0.4, 0.4), font: customFont });
    }

    // Ngày cấp
    page.drawText(`Ngày cấp: ${issuedDate}`, { x: 100, y: height - 460, size: 16, color: rgb(0.3, 0.3, 0.3), font: customFont });

    // QR Code
    const qrBytes = Uint8Array.from(atob(qrImageDataUrl.split(',')[1]), c => c.charCodeAt(0));
    const qrImage = await pdfDoc.embedPng(qrBytes);
    page.drawImage(qrImage, { x: width - 230, y: height - 400, width: 180, height: 180 });
    page.drawText('Quét mã để xác thực', { x: width - 240, y: height - 430, size: 14, color: rgb(0.4, 0.4, 0.4), font: customFont });
    page.drawText(verifyCode, { x: width - 240, y: height - 455, size: 12, color: rgb(0.2, 0.2, 0.2), font: customFont });

    // TÊN FILE AN TOÀN 100%
    const fileName = `ChungChi_${sanitizeFileName(fullName)}_${courseId}.pdf`;

    // XUẤT PDF
    const pdfBytes = await pdfDoc.save();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    res.send(Buffer.from(pdfBytes));

  } catch (err) {
    console.error('Lỗi tạo chứng chỉ:', err);
    res.status(500).json({ success: false, message: 'Lỗi tạo chứng chỉ' });
  }
};