import { v4 as uuidv4 } from "uuid";
import Report from "../models/report.model.js";
import dotenv from "dotenv";
dotenv.config();

export async function saveReport(testCode, userEmail, results) {
    const total = results.length;
    const receivedCount = results.filter(r => r.received).length;
    const deliverabilityScore = Math.round((receivedCount / total) * 100);
  
    const reportId = uuidv4();
    const createdAt = new Date();
  
    const report = new Report({
      reportId,
      testCode,
      userEmail,
      results,
      deliverabilityScore,
      createdAt
    });
    await report.save();
  
    return {
      reportId,
      link: `${process.env.DOMAIN}/report/${reportId}`,
      results,
      deliverabilityScore
    };
  }
  
