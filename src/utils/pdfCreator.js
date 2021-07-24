import pdf from 'html-pdf';
import generateHtml from './certificateGenerators/assetFinanceCertificate';

async function createPdf(options, html, pdfPath) {
  return new Promise((resolve, reject) => {
    pdf.create(html, options).toFile(pdfPath, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
}

export async function generateAssetFinanceCertificate({
  fullName,
  amountPaid,
  itemPrice,
  startDate,
  endDate,
  duration,
  asset,
  seller,
}) {
  const html = generateHtml({
    fullName,
    amountPaid,
    itemPrice,
    startDate,
    endDate,
    duration,
    asset,
    seller,
  });

  const res = await createPdf(
    { format: 'Letter', orientation: 'landscape' },
    html,
    './assetFinanceCertificate.pdf'
  );
  return res;
}
