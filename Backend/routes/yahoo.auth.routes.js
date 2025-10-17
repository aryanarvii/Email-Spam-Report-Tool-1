import express from "express";
import { AuthorizationCode } from "simple-oauth2";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

const client = new AuthorizationCode({
  client: {
    id: process.env.YAHOO_CLIENT_ID,
    secret: process.env.YAHOO_CLIENT_SECRET,
  },
  auth: {
    tokenHost: "https://api.login.yahoo.com",
    authorizePath: "/oauth2/request_auth",
    tokenPath: "/oauth2/get_token",
  },
});

// 1️⃣ Login route
router.get("/yahoo", (req, res) => {
  const authorizationUri = client.authorizeURL({
    redirect_uri: process.env.YAHOO_REDIRECT_URI,
    scope: "mail-r",
    response_type: "code",
    state: Math.random().toString(36).substring(7),
  });
  res.redirect(authorizationUri);
});

// 2️⃣ Callback
router.get("/yahoo/callback", async (req, res) => {
  const { code } = req.query;
  console.log("Yahoo callback query:", req.query);

  if (!code) {
    return res.status(400).send("Missing code in Yahoo callback");
  }

  try {
    const accessToken = await client.getToken({
      code,
      redirect_uri: process.env.YAHOO_REDIRECT_URI,
      scope: "mail-r",
    });

    console.log("✅ Yahoo tokens:", accessToken.token);
    res.send("Yahoo auth successful — check terminal for tokens.");
  } catch (err) {
    console.error("❌ Yahoo OAuth Error:", err);
    res.status(500).send("Yahoo OAuth failed");
  }
});

export default router;
