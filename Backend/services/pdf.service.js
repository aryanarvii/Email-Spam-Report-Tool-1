import puppeteer from "puppeteer";

export async function generateReportPDF(report) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  const html = `
    <html>
      <head>
        <style>
          body { font-family: Arial; }
          table { border-collapse: collapse; width: 100%; }
          th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
          th { background-color: #f4f4f4; }
        </style>
      </head>
      <body>
        <h2>Email Deliverability Report</h2>
        <p><strong>Test Code:</strong> ${report.testCode}</p>
        <p><strong>Score:</strong> ${report.deliverabilityScore}%</p>
        <table>
          <tr>
            <th>Provider</th><th>Received</th><th>Folder</th>
          </tr>
          ${report.results.map(r => `
            <tr>
              <td>${r.provider}</td>
              <td>${r.received ? "✅" : "❌"}</td>
              <td>${r.folder}</td>
            </tr>
          `).join("")}
        </table>
      </body>
    </html>
  `;

  await page.setContent(html);
  const pdf = await page.pdf({ format: "A4" });
  await browser.close();

  return pdf;
}
