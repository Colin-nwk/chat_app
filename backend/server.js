import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route.js";
import connectToMongoDB from "./db/connectToMongoDB.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
// app.get("/", (req, res) => {
//   res.send("hello");
// });

app.use("/api/auth", authRoute);
app.listen(PORT, () => {
  connectToMongoDB();
  console.log("server is running on : " + PORT);
});
