import puppeteer from "puppeteer";

export async function generateReportPDF(report) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  const html = `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; color: #333; }
          h2 { margin-bottom: 5px; }
          p { margin: 4px 0 12px 0; }
          table { border-collapse: collapse; width: 100%; margin-top: 10px; }
          th, td { border: 1px solid #ccc; padding: 8px; text-align: left; font-size: 14px; }
          th { background-color: #f4f4f4; font-weight: bold; }
          tr:nth-child(even) { background-color: #fafafa; }
          .score { font-size: 18px; margin-bottom: 10px; }
        </style>
      </head>
      <body>
        <h2>📊 Email Deliverability Report</h2>
        <p><strong>Test Code:</strong> ${report.testCode}</p>
        <p class="score"><strong>Overall Score:</strong> ${report.deliverabilityScore}%</p>
        <table>
          <tr>
            <th>#</th>
            <th>Provider</th>
            <th>Account</th>
            <th>Received</th>
            <th>Folder</th>
            <th>Mail Read</th>
          </tr>
          ${report.results
            .map(
              (r, index) => `
            <tr>
              <td>${index + 1}</td>
              <td>${r.provider}</td>
              <td>${r.account || "-"}</td>
              <td>${r.received ? "✅ Yes" : "❌ No"}</td>
              <td>${r.folder}</td>
              <td>${r.read === "READ" ? "SEEN ✅" : "NO UPDATE ❌"}</td>
            </tr>
          `
            )
            .join("")}
        </table>
      </body>
    </html>
  `;

  await page.setContent(html);
  const pdf = await page.pdf({ format: "A4" });
  await browser.close();

  return pdf;
}
