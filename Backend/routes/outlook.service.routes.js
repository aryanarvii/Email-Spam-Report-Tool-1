import express from "express";
import { searchOutlookMailByCode } from "../services/outlook.service.js";

const router = express.Router();

router.get("/check-outlook/:code", async (req, res) => {
  const result = await searchOutlookMailByCode(req.params.code);
  res.json(result);
});

export default router;
