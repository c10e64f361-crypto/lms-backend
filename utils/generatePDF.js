// utils/generatePDF.js
const jsPDF = require('jspdf');
const QRCode = require('qrcode');

async function generatePDF(certData) {
  const doc = new jsPDF();
  doc.text('CHỨNG CHỈ HOÀN THÀNH KHÓA HỌC', 105, 20, { align: 'center' });
  doc.text(`Họ tên: ${certData.fullName}`, 20, 40);
  doc.text(`CCCD: ${certData.cccd}`, 20, 50);
  doc.text(`Khóa học: ${certData.course}`, 20, 60);
  doc.text(`Ngày cấp: ${certData.issuedDate}`, 20, 70);

  // Tạo QR
  const qr = await new Promise((resolve) => {
    QRCode.toDataURL(certData.qrLink, (err, url) => resolve(url));
  });
  doc.addImage(qr, 'PNG', 140, 80, 50, 50);

  return doc.output('arraybuffer');
}

module.exports = generatePDF;