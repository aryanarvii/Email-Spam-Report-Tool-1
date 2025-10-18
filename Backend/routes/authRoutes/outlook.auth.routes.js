// import express from "express";
// import dotenv from "dotenv";
// import { AuthorizationCode } from "simple-oauth2";

// dotenv.config();
// const router = express.Router();

// const client = new AuthorizationCode({
//   client: {
//     id: process.env.OUTLOOK_CLIENT_ID,
//     secret: process.env.OUTLOOK_CLIENT_SECRET,
//   },
//   auth: {
//     tokenHost: "https://login.microsoftonline.com",
//     authorizePath: `/${process.env.OUTLOOK_TENANT_ID}/oauth2/v2.0/authorize`,
//     tokenPath: `/${process.env.OUTLOOK_TENANT_ID}/oauth2/v2.0/token`,
//   },
// });

// const redirectUri = "http://localhost:5000/api/auth/outlook/callback";

// // 🔹 Start login
// router.get("/outlook", (req, res) => {
//   const authorizationUri = client.authorizeURL({
//     redirect_uri: redirectUri,
//     scope: "Mail.Read offline_access",
//   });
//   res.redirect(authorizationUri);
// });

// // 🔹 Callback
// router.get("/outlook/callback", async (req, res) => {
//   const { code } = req.query;
//   try {
//     const accessToken = await client.getToken({
//       code,
//       redirect_uri: redirectUri,
//       scope: "Mail.Read offline_access",
//     });

//     console.log("✅ Outlook tokens:", accessToken.token);
//     res.send("Outlook auth successful — check terminal for tokens.");
//   } catch (err) {
//     console.error("❌ Outlook OAuth Error:", err);
//     res.status(500).send("OAuth failed");
//   }
// });

// export default router;


import express from "express";
import { AuthorizationCode } from "simple-oauth2";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

const client = new AuthorizationCode({
  client: {
    id: process.env.OUTLOOK_CLIENT_ID,
    secret: process.env.OUTLOOK_CLIENT_SECRET,
  },
  auth: {
    tokenHost: "https://login.microsoftonline.com",
    authorizePath: `/${process.env.OUTLOOK_TENANT_ID}/oauth2/v2.0/authorize`,
    tokenPath: `/${process.env.OUTLOOK_TENANT_ID}/oauth2/v2.0/token`,
  },
});

router.get("/outlook", (req, res) => {
  const authUrl = client.authorizeURL({
    redirect_uri: process.env.OUTLOOK_REDIRECT_URI,
    scope: "offline_access Mail.Read",
    response_type: "code",
  });
  //console.log(authUrl)
  res.redirect(authUrl);
  
});

router.get("/outlook/callback", async (req, res) => {
  const { code } = req.query;
  const token = await client.getToken({
    code,
    redirect_uri: process.env.OUTLOOK_REDIRECT_URI,
    scope: "offline_access Mail.Read",
  });
  console.log("✅ Outlook refresh token:", token.token.refresh_token);
  res.send("Check console for your Outlook refresh token");
});

export default router;
