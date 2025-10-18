// import { google } from "googleapis";
// import dotenv from "dotenv";

// dotenv.config();

// // 1️⃣ Create an OAuth2 client with your credentials
// const oauth2Client = new google.auth.OAuth2(
//   process.env.GMAIL_CLIENT_ID,
//   process.env.GMAIL_CLIENT_SECRET,
//   "http://localhost:5000/auth/google/callback"
// );

// // 2️⃣ Set the refresh token you got earlier
// oauth2Client.setCredentials({
//   refresh_token: process.env.GMAIL_REFRESH_TOKEN,
// });

// // 3️⃣ Create Gmail API client
// const gmail = google.gmail({ version: "v1", auth: oauth2Client });

// // 4️⃣ A function to search for an email containing a specific test code
// export async function searchEmailByCode(testCode) {
//   try {
//     const res = await gmail.users.messages.list({
//       userId: "me",
//       q: testCode, // Gmail search query
//       maxResults: 1,
//     });

//     if (!res.data.messages) {
//       return { found: false };
//     }

//     const messageId = res.data.messages[0].id;
//     const msg = await gmail.users.messages.get({
//       userId: "me",
//       id: messageId,
//       format: "metadata",
//     });

//     // You can inspect msg.data.labelIds to know where the mail landed
//     return {
//       found: true,
//       labels: msg.data.labelIds,
//     };
//   } catch (err) {
//     console.error("❌ Gmail API error:", err);
//     return { found: false, error: err };
//   }
// }


import { google } from "googleapis";
import dotenv from "dotenv";
dotenv.config();

const oauth2Client = new google.auth.OAuth2(
  process.env.GMAIL_CLIENT_ID,
  process.env.GMAIL_CLIENT_SECRET,
  process.env.GMAIL_REDIRECT_URI
);

export async function searchEmailByCode(testCode, refreshToken) {
  try {
    oauth2Client.setCredentials({ refresh_token: refreshToken });

    const gmail = google.gmail({ version: "v1", auth: oauth2Client });

    // 🔸 Search by test code
    const res = await gmail.users.messages.list({
      userId: "me",
      q: testCode,
      maxResults: 1,
    });

    if (!res.data.messages) {
      return { found: false, labels: [] };
    }

    const messageId = res.data.messages[0].id;
    const msg = await gmail.users.messages.get({
      userId: "me",
      id: messageId,
      format: "metadata",
    });

    return {
      found: true,
      labels: msg.data.labelIds,
    };
  } catch (err) {
    console.error("❌ Gmail API error:", err);
    return { found: false, error: err };
  }
}
