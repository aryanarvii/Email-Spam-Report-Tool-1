import Imap from "imap-simple";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

// Helper: get access token using refresh token
async function getYahooAccessToken() {
  const res = await fetch("https://api.login.yahoo.com/oauth2/get_token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.YAHOO_CLIENT_ID,
      client_secret: process.env.YAHOO_CLIENT_SECRET,
      redirect_uri: process.env.YAHOO_REDIRECT_URI,
      refresh_token: process.env.YAHOO_REFRESH_TOKEN,
      grant_type: "refresh_token",
    }),
  });

  const data = await res.json();
  return data.access_token;
}

// Main function: search email
export async function searchYahooMailByCode(testCode) {
  try {
    const accessToken = await getYahooAccessToken();

    const config = {
      imap: {
        xoauth2: `user=${process.env.YAHOO_EMAIL}\x01auth=Bearer ${accessToken}\x01\x01`,
        host: "imap.mail.yahoo.com",
        port: 993,
        tls: true,
        authTimeout: 10000,
      },
    };

    const connection = await Imap.connect(config);
    await connection.openBox("INBOX");

    const searchCriteria = [["HEADER", "Subject", testCode]];
    const fetchOptions = { bodies: ["HEADER.FIELDS (FROM TO SUBJECT DATE)"], markSeen: false };

    const messages = await connection.search(searchCriteria, fetchOptions);

    if (messages.length === 0) {
      console.log("❌ No Yahoo emails found with code:", testCode);
      return { found: false };
    }

    console.log("✅ Yahoo email found:", messages[0].parts[0].body);
    return { found: true, email: messages[0].parts[0].body };
  } catch (err) {
    console.error("❌ Yahoo IMAP Error:", err);
    return { found: false, error: err.message };
  }
}
