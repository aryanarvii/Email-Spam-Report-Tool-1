import express from "express";
import Report from "../models/report.model.js";
import { generateReportPDF } from "../services/pdf.service.js";

const router = express.Router();

router.get("/:id", async (req, res) => {
  const report = await Report.findOne({ reportId: req.params.id });
  if (!report) return res.status(404).send("Report not found");
  res.json(report);
});

// existing: GET /report/:id

// router.get("/:email", async (req, res) => {
//   const reports = await Report.find({ userEmail: req.params.email })  
//     .sort({ createdAt: -1 })
//     .limit(20);
//   res.json(reports);
// });

router.get("/by-email/:email", async (req, res) => {
  const reports = await Report.find({ userEmail: req.params.email })
    .sort({ createdAt: -1 })
    .limit(20);
  res.json(reports);
});



router.get("/:id/pdf", async (req, res) => {
  // console.log("req - ", req.params)
  const report = await Report.findOne({ reportId: req.params.id });
  if (!report) return res.status(404).send("Not found");

  const pdf = await generateReportPDF(report);
  res.set({
    "Content-Type": "application/pdf",
    "Content-Disposition": `attachment; filename="report-${report.reportId}.pdf"`,
  });
  res.send(pdf);
});



export default router;
