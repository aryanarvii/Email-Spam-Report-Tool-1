import express from "express";
import cors from "cors"
import dotenv from "dotenv";
dotenv.config();

const app = express();

const allowedOrigins = [
    "https://email-spam-report-tool-1.vercel.app",         // main frontend
    "http://localhost:5173",                                // local dev
  ];
  
  app.use(
    cors({
      origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
      credentials: true,
      methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );
  


app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(express.static("public"));

import testRoutes from "./routes/test.routes.js";
app.use("/api/test", testRoutes);

app.get("/", (req, res) => {
  res.send("Server is running...");
});


import authRoutes from "./routes/gmail.auth.routes.js";
app.use("/api/auth", authRoutes);

import checkmailRoutes from "./routes/gmail.service.routes.js";
app.use("/api/checkmail", checkmailRoutes);

import outlookAuthRoutes from "./routes/outlook.auth.routes.js";
app.use("/api/auth", outlookAuthRoutes);

import outlookServiceRoutes from "./routes/outlook.service.routes.js";
app.use("/api/outlook", outlookServiceRoutes);

import yahooAuthRoutes from "./routes/yahoo.auth.routes.js";
app.use("/api/auth", yahooAuthRoutes);

import yahooServiceRoutes from "./routes/yahoo.service.routes.js";
app.use("/api/yahoo", yahooServiceRoutes);

import checkemailsRoutes from "./routes/checkemails.routes.js";
app.use("/api/checkemails", checkemailsRoutes);

import reportRoutes from "./routes/report.routes.js";
app.use("/api/report", reportRoutes);

import trackingRoutes from "./routes/tracking.routes.js";
app.use("/api/track", trackingRoutes);


// TESTING ROUTES

// import { sendReportMail } from "./services/mailer.service.js";

// app.get("/test-mail", async (req, res) => {
//   try {
//     await sendReportMail("studynotion052@gmail.com", "http://localhost:5000/report/12345");
//     res.send("✅ Mail sent successfully!");
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("❌ Failed to send mail");
//   }
// });

export {app}