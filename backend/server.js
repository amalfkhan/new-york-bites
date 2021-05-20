import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';
import routes from "./api/routes.js";
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/restaurants", routes);
app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

export default app;