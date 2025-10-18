// import fetch from "node-fetch";
// import { AuthorizationCode } from "simple-oauth2";
// import dotenv from "dotenv";

// dotenv.config();

// const client = new AuthorizationCode({
//   client: {
//     id: process.env.OUTLOOK_CLIENT_ID,
//     secret: process.env.OUTLOOK_CLIENT_SECRET,
//   },
//   auth: {
//     tokenHost: "https://login.microsoftonline.com",
//     tokenPath: `/${process.env.OUTLOOK_TENANT_ID}/oauth2/v2.0/token`,
//   },
// });

// export async function searchOutlookMailByCode(testCode) {
//   try {
//     // 1️⃣ Get new access token using refresh token
//     const tokenParams = {
//       scope: "Mail.Read offline_access",
//       grant_type: "refresh_token",
//       refresh_token: process.env.OUTLOOK_REFRESH_TOKEN,
//     };

//     const tokenResponse = await fetch(
//       `https://login.microsoftonline.com/${process.env.OUTLOOK_TENANT_ID}/oauth2/v2.0/token`,
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/x-www-form-urlencoded" },
//         body: new URLSearchParams({
//           client_id: process.env.OUTLOOK_CLIENT_ID,
//           client_secret: process.env.OUTLOOK_CLIENT_SECRET,
//           refresh_token: process.env.OUTLOOK_REFRESH_TOKEN,
//           grant_type: "refresh_token",
//           scope: "Mail.Read offline_access",
//         }),
//       }
//     );

//     const tokenData = await tokenResponse.json();
//     const accessToken = tokenData.access_token;

//     // 2️⃣ Use Microsoft Graph API to search inbox
//     const searchResponse = await fetch(
//       `https://graph.microsoft.com/v1.0/me/messages?$search="${testCode}"`,
//       {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           "Content-Type": "application/json",
//           Prefer: 'outlook.body-content-type="text"',
//         },
//       }
//     );

//     const messages = await searchResponse.json();
//     return messages;
//   } catch (error) {
//     console.error("❌ Outlook search error:", error);
//     return null;
//   }
// }


import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

export async function searchOutlookMailByCode(testCode, refreshToken) {
  try {
    // 1️⃣ Exchange refresh token for new access token
    const tokenResponse = await fetch(
      `https://login.microsoftonline.com/${process.env.OUTLOOK_TENANT_ID}/oauth2/v2.0/token`,
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          client_id: process.env.OUTLOOK_CLIENT_ID,
          client_secret: process.env.OUTLOOK_CLIENT_SECRET,
          refresh_token: refreshToken,
          grant_type: "refresh_token",
          scope: "Mail.Read offline_access",
        }),
      }
    );

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // 2️⃣ Search inbox for test code
    const searchResponse = await fetch(
      `https://graph.microsoft.com/v1.0/me/messages?$search="${testCode}"`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          Prefer: 'outlook.body-content-type="text"',
        },
      }
    );

    return await searchResponse.json();
  } catch (error) {
    console.error("❌ Outlook search error:", error);
    return null;
  }
}
