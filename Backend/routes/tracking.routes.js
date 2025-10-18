import express from "express";
import Report from "../models/report.model.js";
import path from "path";

const router = express.Router();

router.get("/open/:id", async (req, res) => {
  const report = await Report.findOne({ reportId: req.params.id });
  if (report) {
    report.opened = true;
    report.openedAt = new Date();
    await report.save();
  }

  const pixelPath = path.join(process.cwd(), "assets", "pixel.png");
  res.sendFile(pixelPath);
});

router.get("/click/:id", async (req, res) => {
    const report = await Report.findOne({ reportId: req.params.id });
    if (report) {
      report.clicked = true;
      report.clickedAt = new Date();
      await report.save();
    }
    // Redirect to original URL (optional)
    res.redirect(`${process.env.F_DOMAIN}/report/${req.params.id}`);
  });
  

export default router;
