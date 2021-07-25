import pdf from 'html-pdf';
import generateAssetFinanceHtml from './certificateGenerators/assetFinanceCertificate';
import generateInvestmentHtml from './certificateGenerators/investmentCertificate';

async function createPdf(options, html, pdfPath) {
  return new Promise((resolve, reject) => {
    pdf.create(html, options).toFile(pdfPath, (err, res) => {
  console.log('err', err);

      if (err) reject(err);
      resolve(res);
    });
  });
}

export async function generateAssetFinanceCertificate(data) {
  const html = generateAssetFinanceHtml(data);
  const res = await createPdf(
    { format: 'Letter', orientation: 'landscape' },
    html,
    './assetFinanceCertificate.pdf'
  );
  return res;
}

export async function generateInvestmentCertificate(data) {
  const html = generateInvestmentHtml(data);
  const res = await createPdf(
    { format: 'Letter', orientation: 'landscape' },
    html,
    './investmentCertificate.pdf'
  );
  console.log('res', res);
  return res;
}
