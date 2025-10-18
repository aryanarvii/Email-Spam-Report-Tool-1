// import express from "express";
// import { google } from "googleapis";
// import dotenv from "dotenv";
// dotenv.config();

// const router = express.Router();

// console.log("CLIENT_ID:", process.env.GMAIL_CLIENT_ID);
// console.log("CLIENT_SECRET:", process.env.GMAIL_CLIENT_SECRET);

// const oauth2Client = new google.auth.OAuth2(
//   process.env.GMAIL_CLIENT_ID,
//   process.env.GMAIL_CLIENT_SECRET,
//   "http://localhost:5000/api/auth/google/callback"
// );

// router.get("/google", async(req, res) => {
//   const url = await oauth2Client.generateAuthUrl({
//     access_type: "offline",
//     prompt: "consent",
//     scope: ["https://www.googleapis.com/auth/gmail.readonly"],
//   });
//   res.redirect(url);
// });

// router.get("/google/callback", async (req, res) => {
//   const { code } = req.query;
//   console.log("code:", code);
//   const { tokens } = await oauth2Client.getToken(code);
//   console.log(tokens);
//   res.send("Auth successful. Check console for tokens.");
// });

// export default router;


import express from "express";
import { google } from "googleapis";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

const oauth2Client = new google.auth.OAuth2(
  process.env.GMAIL_CLIENT_ID,
  process.env.GMAIL_CLIENT_SECRET,
  process.env.GMAIL_REDIRECT_URI
);

router.get("/google", async (req, res) => {
  const url = await oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: ["https://www.googleapis.com/auth/gmail.readonly"],
  });
  console.log("url ", url)
  res.redirect(url);
});

router.get("/google/callback", async (req, res) => {
  const { code } = req.query;
  const { tokens } = await oauth2Client.getToken(code);
  console.log("✅ Refresh token:", tokens.refresh_token);
  res.send("Check console for your refresh token");

});

export default router;
