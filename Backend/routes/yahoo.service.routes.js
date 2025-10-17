import express from "express";
import { searchYahooMailByCode } from "../services/yahoo.service.js";

const router = express.Router();

router.get("/check-yahoo/:code", async (req, res) => {
  const result = await searchYahooMailByCode(req.params.code);
  res.json(result);
});

export default router;
