import { searchEmailByCode as gmailCheck } from "./gmail.service.js";
import { searchOutlookMailByCode as outlookCheck } from "./outlook.service.js";
import { searchYahooMailByCode as yahooCheck } from "./yahoo.service.js";

export async function runDeliverabilityTest(testCode) {
  const results = [];

  // Gmail
  const gmailResult = await gmailCheck(testCode);
  results.push({
    provider: "Gmail",
    received: gmailResult.found,
    folder: gmailResult.folder || "Not Found",
  });

  // Outlook
  const outlookResult = await outlookCheck(testCode);
  results.push({
    provider: "Outlook",
    received: outlookResult.found,
    folder: outlookResult.folder || "Not Found",
  });

  // Yahoo
  const yahooResult = await yahooCheck(testCode);
  results.push({
    provider: "Yahoo",
    received: yahooResult.found,
    folder: yahooResult.folder || "Not Found",
  });

  return results;
}
