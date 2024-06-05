import jwt from "jsonwebtoken";
import dotenv from "dotenv";

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

// Helper function to verify and decode the token
export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    console.error("Error in verifyToken:", error.message);
    return null;
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
