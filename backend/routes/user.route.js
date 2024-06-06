import express from "express";
import { getUsersForSidebar } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/token.js";

const router = express.Router();

router.get("/", verifyToken, getUsersForSidebar);
// router.get("/:id", verifyToken, getMessage);

// router.post("/login", login);

// router.post("/logout", logout);

export default router;
