import express from "express";
import { sendMessage } from "../controllers/message.controller.js";
import { verifyToken } from "../utils/token.js";

const router = express.Router();

router.post("/send/:id", verifyToken, sendMessage);

// router.post("/login", login);

// router.post("/logout", logout);

export default router;
