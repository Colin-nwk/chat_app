import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route.js";
import messageRoute from "./routes/message.route.js";
import cookieParser from "cookie-parser";
import connectToMongoDB from "./db/connectToMongoDB.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cookieParser());

// app.get("/", (req, res) => {
//   res.send("hello");
// });

app.use("/api/auth", authRoute);
app.use("/api/message", messageRoute);
app.listen(PORT, () => {
  connectToMongoDB();
  console.log("server is running on : " + PORT);
});
