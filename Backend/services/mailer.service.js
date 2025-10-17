import nodemailer from "nodemailer";

export async function sendReportMail(to, reportLink) {
  const reportId = reportLink.split("/").pop();
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SENDER_EMAIL,
      pass: process.env.SENDER_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: process.env.SENDER_EMAIL,
    to,
    subject: "Your Email Deliverability Report",
    html: `
      <p>Your report is ready:</p>
      <a href="${process.env.DOMAIN}/click/${reportId}">View Report</a>
      <img src="${process.env.DOMAIN}/open/${reportId}" width="1" height="1" />
    `,
  });
}
