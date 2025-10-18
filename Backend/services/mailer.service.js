// import nodemailer from "nodemailer";

// export async function sendReportMail(to, reportLink) {
//   const reportId = reportLink.split("/").pop();
//   const transporter = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 465,
//     secure: true,
//     service: "gmail",
//     auth: {
//       user: process.env.SENDER_EMAIL,
//       pass: process.env.SENDER_PASSWORD,
//     },
//   });

//   await transporter.sendMail({
//     from: process.env.SENDER_EMAIL,
//     to,
//     subject: "Your Email Deliverability Report",
//     html: `
//       <p>Your report is ready:</p>
//       <a href="${process.env.DOMAIN}/click/${reportId}">View Report</a>
//       <img src="${process.env.DOMAIN}/open/${reportId}" width="1" height="1" />
//     `,
//   });
// }


// mailer.service.js
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.sendgrid.net",
  port: 587,
  auth: {
    user: "apikey", // literally this string
    pass: process.env.SENDGRID_API_KEY,
  },
});

export async function sendReportMail(to, reportLink) {
  const reportId = reportLink.split("/").pop();

  const html = `
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f4;padding:20px 0;font-family:Arial,Helvetica,sans-serif;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;padding:30px;border-radius:8px;">
          <tr>
            <td align="center" style="padding-bottom: 20px;">
              <h1 style="color:#333333;margin:0;font-size:24px;">📊 Email Deliverability Report</h1>
            </td>
          </tr>
          <tr>
            <td style="color:#555555;font-size:16px;line-height:24px;">
              <p>Hello,</p>
              <p>Your deliverability test has been successfully completed. 
              Click the button below to view your full report:</p>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding: 25px 0;">
              <a href="${process.env.DOMAIN}/report/${reportId}" target="_blank" 
                style="background-color:#2563eb;color:#ffffff;padding:12px 24px;
                       text-decoration:none;border-radius:6px;font-size:16px;display:inline-block;">
                👉 View Your Report
              </a>
              <img src="${process.env.DOMAIN}/api/track/open/${reportId}" width="1" height="1" />
            </td>
          </tr>
          <tr>
            <td style="color:#555555;font-size:14px;line-height:22px;">
              <p>If the button doesn't work, copy and paste the following link in your browser:</p>
              <p style="word-break: break-all;"><a href="${process.env.DOMAIN}/report/${reportId}" style="color:#2563eb;">${process.env.DOMAIN}/report/${reportId}</a></p>
            </td>
          </tr>
          <tr>
            <td style="border-top:1px solid #e0e0e0;padding-top:20px;color:#777777;font-size:13px;text-align:center;">
              <p>Sent by <strong>Email Spam Report Tool</strong></p>
              <p>© ${new Date().getFullYear()} Email Spam Report Tool. All rights reserved.</p>
              <p style="font-size:12px;color:#999999;">You received this email because you ran a deliverability test.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
  `;

  await transporter.sendMail({
    from: `"Email Spam Report Tool" <${process.env.SENDER_EMAIL}>`,
    to,
    subject: "📊 Your Email Deliverability Report is Ready",
    html
  });


  console.log(`✅ Report mail sent to ${to}`);
}
