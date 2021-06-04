// setup base access point for routes in the api
import express from "express";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import routes from "./api/routes.js";
const app = express();

app.use(cors({ origin: true, credentials: true }));
app.options("*", cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/restaurants", routes);
// app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

// serve static assets if in prod
if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

export default app;
