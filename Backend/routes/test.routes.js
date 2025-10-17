import express from "express";
import { generateTestCode } from "../controllers/test.controllers.js";

const router = express.Router();

// POST /api/test/generate
router.post("/generate", generateTestCode);

export default router;
