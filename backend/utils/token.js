import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.model.js";

dotenv.config();

export const generateTokenAndCookie = (userId, res) => {
  try {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "15d",
    });

    const cookieOptions = {
      maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      path: "/", // Ensures the cookie is accessible across your entire domain
    };

    res.cookie("jwt", token, cookieOptions);
    return token;
  } catch (error) {
    console.error("Error in generateTokenAndCookie:", error.message);
    throw error;
  }
};

export const verifyToken = async (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized - No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ error: "Unauthorized - User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: "Unauthorized - Invalid token" });
    } else if (err instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ error: "Unauthorized - Token expired" });
    } else {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
};

// Function to clear the JWT cookie
export const clearTokenCookie = (res) => {
  res.cookie("jwt", "", {
    expires: new Date(0),
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
};
