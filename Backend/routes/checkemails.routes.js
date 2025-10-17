import express from "express";
import { runDeliverabilityTest } from "../services/checkemails.service.js";
import { saveReport } from "../services/report.service.js";

const router = express.Router();

router.post("/check", async (req, res) => {
  const { testCode, userEmail } = req.body;

  const results = await runDeliverabilityTest(testCode);
  const report = await saveReport(testCode, userEmail, results);

  await sendReportMail(userEmail, `${process.env.DOMAIN}/report/${report.reportId}`);


  res.json(report);
});

export default router;
