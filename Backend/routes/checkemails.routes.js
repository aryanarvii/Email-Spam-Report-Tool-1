import express from "express";
import { runDeliverabilityTest } from "../services/checkemails.service.js";
import { saveReport } from "../services/report.service.js";
import {sendReportMail} from "../services/mailer.service.js"

const router = express.Router();

router.post("/check", async (req, res) => {
  const { testCode, userEmail } = req.body;
  
  const results = await runDeliverabilityTest(testCode);
  //console.log("results", results)
  const report = await saveReport(testCode, userEmail, results);
  // console.log("report -", report)

  await sendReportMail(userEmail, `${process.env.DOMAIN}/report/${report.reportId}`);


  res.json(report);
});

export default router;
