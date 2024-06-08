import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route.js";
import messageRoute from "./routes/message.route.js";
import userRoute from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";
import path from "path";

dotenv.config();
const __dirname = path.resolve();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/message", messageRoute);
app.use("/api/user", userRoute);
app.get("/api/test", (req, res) => {
  res.json("success");
});

app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});
server.listen(PORT, () => {
  connectToMongoDB();
  console.log("server is running on : " + PORT);
});
