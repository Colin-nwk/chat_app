import { validateSignup } from "../validations/signup.validation.js";
import { validateLogin } from "../validations/login.validation.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateTokenAndCookie, clearTokenCookie } from "../utils/token.js";

/**
 * Description placeholder
 *
 * @async
 * @param {*} req
 * @param {*} res
 * @returns {unknown}
 */
export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    const { errors, isValid } = validateSignup(req.body);
    if (!isValid) return res.status(422).json(errors);

    const userExists = await User.findOne({ username });
    if (userExists) return res.status(400).json("Username already exists");

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePicture: gender === "male" ? boyProfilePic : girlProfilePic,
    });
    await newUser.save();

    generateTokenAndCookie(newUser._id, res);

    res.status(201).json({
      message: "User created successfully",
      user: {
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePicture: newUser.profilePicture,
      },
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Internal server error");
  }
};

/**
 * Description placeholder
 *
 * @async
 * @param {*} req
 * @param {*} res
 * @returns {unknown}
 */
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const { errors, isValid } = validateLogin(req.body);
    if (!isValid) return res.status(400).json(errors);

    const user = await User.findOne({ username });
    if (!user) return res.status(404).json("User not found");

    const isMatch = await bcrypt.compare(password, user?.password || "");
    if (!isMatch) return res.status(400).json("Invalid credentials");

    generateTokenAndCookie(user._id, res);

    res.status(200).json({
      message: "login successfully",
      user: {
        id: user._id,
        fullName: user.fullName,
        username: user.username,
        gender: user.gender,
        profilePicture: user.profilePicture,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal server error");
  }
};

/**
 * Description placeholder
 *
 * @param {*} req
 * @param {*} res
 */
export const logout = (req, res) => {
  try {
    clearTokenCookie(res);
    res.status(204).json({ message: "Logged out successfully" });
    console.log("logout");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
