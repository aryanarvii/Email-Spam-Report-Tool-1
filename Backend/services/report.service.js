import { v4 as uuidv4 } from "uuid";
import Report from "../models/report.model.js";

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
      link: `${proccess.env.DOMAIN}/report/${reportId}`,
      results,
      deliverabilityScore
    };
  }
  
