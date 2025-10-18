import { searchEmailByCode as gmailCheck } from "./gmail.service.js";
import { searchOutlookMailByCode as outlookCheck } from "./outlook.service.js";
import { searchYahooMailByCode as yahooCheck } from "./yahoo.service.js";

export async function runDeliverabilityTest(testCode) {
  const results = [];

  // Gmail
  const gmailResult = await gmailCheck(testCode);
  //console.log("gmailResult ", gmailResult)
  
  results.push({
    provider: "Gmail",
    received: gmailResult.found,
    folder:
    gmailResult.labels?.find(
      (label) =>
        label === "SPAM" ||
        label === "TRASH" ||
        label === "INBOX" ||
        label === "SENT" ||
        label === "DRAFT" ||
        label.startsWith("CATEGORY_")
    ) || "Not Found",

    read: gmailResult.labels?.includes("UNREAD") ? "UNREAD" : "READ", 

  });
  

  // Outlook
  const outlookResult = await outlookCheck(testCode);
  //console.log("outlookResult- ", outlookResult)
  let received = false;
  let folder = "Not Found";
  let read = "UNREAD"

  if (outlookResult.value && outlookResult.value.length > 0) {
    received = true;

    // "inferenceClassification": "focused" usually = Inbox
    if (outlookResult.value[0].inferenceClassification === "focused") {
      folder = "Inbox";
    } else {
      folder = "Other"; // or Promotions if you're mapping this way
    }

    read = outlookResult.value[0].isRead ? "READ" : "UNREAD";
    console.log("out read -", outlookResult.value[0])
  }
  results.push({
    provider: "Outlook",
    received,
    folder,
    read
    
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
