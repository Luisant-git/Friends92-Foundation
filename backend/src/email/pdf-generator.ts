import PDFDocument from 'pdfkit';

function numberToWords(num: number): string {
  const a = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  if (num === 0) return 'Zero';

  const numStr = ('000000000' + num.toString()).slice(-9);
  const match = numStr.match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
  if (!match) return '';

  let str = '';
  str += parseInt(match[1]) !== 0 ? (a[Number(match[1])] || b[Number(match[1][0])] + ' ' + a[Number(match[1][1])]) + ' Crore ' : '';
  str += parseInt(match[2]) !== 0 ? (a[Number(match[2])] || b[Number(match[2][0])] + ' ' + a[Number(match[2][1])]) + ' Lakh ' : '';
  str += parseInt(match[3]) !== 0 ? (a[Number(match[3])] || b[Number(match[3][0])] + ' ' + a[Number(match[3][1])]) + ' Thousand ' : '';
  str += parseInt(match[4]) !== 0 ? (a[Number(match[4])] || b[Number(match[4][0])] + ' ' + a[Number(match[4][1])]) + ' Hundred ' : '';
  str += parseInt(match[5]) !== 0 ? ((str !== '') ? 'and ' : '') + (a[Number(match[5])] || b[Number(match[5][0])] + ' ' + a[Number(match[5][1])]) + ' ' : '';

  return str.trim().toUpperCase() + ' ONLY';
}

export function generateReceiptPdf(donation: {
  id: number;
  name: string;
  email: string;
  phone: string;
  amount: number;
  message?: string | null;
  createdAt: Date;
  receiptType?: 'DONATION' | 'SUBSCRIPTION';
}): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ size: 'A4', margin: 40 });
      const chunks: Buffer[] = [];

      doc.on('data', (chunk) => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', (err) => reject(err));

      // Draw border/box for Header:
      doc.rect(40, 40, doc.page.width - 80, 100).stroke('#1e3a8a');

      // Inside header:
      doc.fontSize(18)
        .fillColor('#1e3a8a')
        .font('Helvetica-Bold')
        .text('GPTCK 92 TRUST', 40, 52, { align: 'center', width: doc.page.width - 80 });

      doc.fontSize(9)
        .fillColor('#000000')
        .font('Helvetica')
        .text('Trust Reg No. 22/2025 | Pan No. AAFTG1194G', 40, 72, { align: 'center', width: doc.page.width - 80 });

      doc.text('No.3/153, A3, R.N. Complex, Azad Nagar, Venkatapuram, Bynapalli Village, Krishnagiri - 635 001', 40, 85, { align: 'center', width: doc.page.width - 80 });

      // Line separator inside the header box:
      doc.moveTo(40, 105).lineTo(doc.page.width - 40, 105).stroke('#1e3a8a');

      // Box bottom text:
      doc.fontSize(9)
        .fillColor('#6b7280')
        .font('Helvetica-Oblique')
        .text("80G Receipt - You've Just Done Something Wonderful - Thank You", 40, 116, { align: 'center', width: doc.page.width - 80 });

      // Sl. No. R0046 | 80G RECEIPT | Date : 9/8/2023
      const startY = 170;
      doc.fontSize(11)
        .fillColor('#000000')
        .font('Helvetica-Bold')
        .text(`Sl. No. R${donation.id.toString().padStart(4, '0')}`, 40, startY);

      doc.font('Helvetica-Bold')
        .text('80G RECEIPT', 40, startY, { align: 'center', width: doc.page.width - 80, underline: true });

      doc.font('Helvetica-Bold')
        .text(`Date : ${new Date(donation.createdAt).toLocaleDateString('en-GB')}`, 40, startY, { align: 'right', width: doc.page.width - 80 });

      // Parse PAN and Razorpay Transaction ID from message
      let pan = 'N/A';
      let txnId = 'N/A';
      if (donation.message) {
        const panMatch = donation.message.match(/PAN:\s*([^\s|]+)/i);
        const txnMatch = donation.message.match(/Txn:\s*([^\s|]+)/i);
        if (panMatch) pan = panMatch[1];
        if (txnMatch) txnId = txnMatch[1];
      }

      // Rows
      let contentY = 220;
      const rowHeight = 35;

      // Received with thanks from
      doc.font('Helvetica')
        .text('Received with thanks from:  ', 40, contentY, { continued: true });
      doc.font('Helvetica-Bold')
        .text(`Mr./Ms. ${donation.name}`);
      doc.moveTo(40, contentY + 20).lineTo(doc.page.width - 40, contentY + 20).dash(2, { space: 2 }).stroke('#d1d5db');
      doc.undash();

      // Email / Phone
      contentY += rowHeight;
      doc.font('Helvetica')
        .text('Email / Phone:  ', 40, contentY, { continued: true });
      doc.font('Helvetica-Bold')
        .text(`${donation.email}  |  ${donation.phone}`);
      doc.moveTo(40, contentY + 20).lineTo(doc.page.width - 40, contentY + 20).dash(2, { space: 2 }).stroke('#d1d5db');
      doc.undash();

      // An amount of Rupees
      contentY += rowHeight;
      doc.font('Helvetica')
        .text('An amount of Rupees:  ', 40, contentY, { continued: true });
      doc.font('Helvetica-Bold')
        .text(`${numberToWords(donation.amount)}`);
      doc.moveTo(40, contentY + 20).lineTo(doc.page.width - 40, contentY + 20).dash(2, { space: 2 }).stroke('#d1d5db');
      doc.undash();

      // Towards donation / subscription label
      contentY += rowHeight;
      const towardsLabel = donation.receiptType === 'SUBSCRIPTION'
        ? 'Towards Subscription charge:  '
        : 'Towards donation by Cash / Cheque / NEFT / DD No:  ';
      doc.font('Helvetica')
        .text(towardsLabel, 40, contentY, { continued: true });
      doc.font('Helvetica-Bold')
        .text(`Razorpay Online (Txn ID: ${txnId})  -  ${new Date(donation.createdAt).toLocaleDateString('en-GB')}`);
      doc.moveTo(40, contentY + 20).lineTo(doc.page.width - 40, contentY + 20).dash(2, { space: 2 }).stroke('#d1d5db');
      doc.undash();

      // ₹ 500 | PAN No : EMAPS910M | For GPTCK 92 TRUST
      contentY += rowHeight + 25;

      // Draw a light grey background box for the total amount
      doc.save();
      doc.rect(40, contentY - 5, 120, 30).fill('#f3f4f6');
      doc.restore();
      doc.fontSize(14)
        .fillColor('#1e3a8a')
        .font('Helvetica-Bold')
        .text(`Rs. ${donation.amount.toLocaleString('en-IN')}`, 50, contentY);

      // PAN No
      doc.fontSize(11)
        .fillColor('#000000')
        .font('Helvetica-Bold')
        .text(`PAN No : ${pan}`, 180, contentY);


      // Exemptions and Mother Teresa Quote at bottom
      const bottomY = doc.page.height - 100;
      doc.moveTo(40, bottomY - 10).lineTo(doc.page.width - 40, bottomY - 10).stroke('#d1d5db');

      doc.fontSize(8.5)
        .fillColor('#6b7280')
        .font('Helvetica-Oblique')
        .text('This is a computer generated receipt, no signature required', 40, bottomY, { align: 'center', width: doc.page.width - 80 });

      doc.text('Do not wait for leaders ! Do it alone person to person ! - Mother Teresa', 40, bottomY + 15, { align: 'center', width: doc.page.width - 80 });

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
}
