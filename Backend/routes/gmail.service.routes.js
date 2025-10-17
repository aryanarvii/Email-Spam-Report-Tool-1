import express from "express";
import { searchEmailByCode } from "../services/gmail.service.js";

const router = express.Router();

router.get("/check-email/:code", async (req, res) => {
  const testCode = req.params.code;
  const result = await searchEmailByCode(testCode);
  res.json(result);
});

export default router;
