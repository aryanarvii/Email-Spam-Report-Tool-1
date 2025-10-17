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
  //console.log("outlookResult- ", outlookResult)
  let received = false;
  let folder = "Not Found";

  if (outlookResult.value && outlookResult.value.length > 0) {
    received = true;

    // "inferenceClassification": "focused" usually = Inbox
    if (outlookResult.value[0].inferenceClassification === "focused") {
      folder = "Inbox";
    } else {
      folder = "Other"; // or Promotions if you're mapping this way
    }
  }
  results.push({
    provider: "Outlook",
    received,
    folder,
  });

  // Yahoo
  // const yahooResult = await yahooCheck(testCode);
  // results.push({
  //   provider: "Yahoo",
  //   received: yahooResult.found,
  //   folder: yahooResult.folder || "Not Found",
  // });

  return results;
}
