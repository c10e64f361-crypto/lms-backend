// controllers/certificateController.js
const Certificate = require('../models/Certificate');
const generatePDF = require('../utils/generatePDF');
const sendEmail = require('../utils/sendEmail');

exports.create = async (req, res) => {
  const cert = req.body;
  const pdfBuffer = await generatePDF(cert);
  const pdfPath = `uploads/cert-${cert.userId}.pdf`;

  Certificate.create(cert, (err, result) => {
    if (err) return res.status(500).json(err);
    sendEmail(cert.email, 'Chứng chỉ LMS Quốc Phòng', 'Chúc mừng bạn hoàn thành!', { filename: 'chung-chi.pdf', content: pdfBuffer });
    res.json({ message: 'Chứng chỉ đã tạo và gửi!' });
  });
};