import express from "express";
import cors from "cors"
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true
}))


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
app.use("/", trackingRoutes);






export {app}