// __tests__/auth.test.js
import { signup, login, logout } from "../controllers/auth.controller.js";
import { validateSignup } from "../validations/signup.validation.js";
import { validateLogin } from "../validations/login.validation.js";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";

jest.mock("../validations/signup.validation", () => ({
  validateSignup: jest.fn(),
}));

jest.mock("../validations/login.validation", () => ({
  validateLogin: jest.fn(),
}));

jest.mock("bcryptjs", () => ({
  genSalt: jest.fn().mockResolvedValue("$2a$10$..."),
  hash: jest.fn().mockResolvedValue("$2a$10$..."),
  compare: jest.fn().mockResolvedValue(true),
}));

describe("Auth Controller", () => {
  let req, res;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    User.mockClear();
  });

  describe("signup", () => {
    it("should return 422 if validations fail", async () => {
      validateSignup.mockReturnValueOnce({
        errors: { username: "is required" },
        isValid: false,
      });

      await signup(req, res);

      expect(res.status).toHaveBeenCalledWith(422);
      expect(res.json).toHaveBeenCalledWith({ username: "is required" });
    });

    it("should return 400 if username already exists", async () => {
      validateSignup.mockReturnValueOnce({ errors: {}, isValid: true });
      User.findOne.mockResolvedValueOnce(global.mockUsers[0]);
      req.body = { username: "johndoe" };

      await signup(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        username: "Username already exists",
      });
    });

    it("should create a new user and return 201", async () => {
      validateSignup.mockReturnValueOnce({ errors: {}, isValid: true });
      User.findOne.mockResolvedValueOnce(null);
      req.body = {
        fullName: "Alice Cooper",
        username: "alicecooper",
        password: "password123",
        confirmPassword: "password123",
        gender: "female",
      };

      await signup(req, res);

      expect(User.mock.instances[0].save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: "User created successfully",
        user: {
          _id: expect.any(String),
          fullName: "Alice Cooper",
          username: "alicecooper",
          profilePicture:
            "https://avatar.iran.liara.run/public/girl?username=alicecooper",
        },
      });
    });
  });

  describe("login", () => {
    it("should return 400 if validations fail", async () => {
      validateLogin.mockReturnValueOnce({
        errors: { username: "is required" },
        isValid: false,
      });

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ username: "is required" });
    });

    it("should return 404 if user not found", async () => {
      validateLogin.mockReturnValueOnce({ errors: {}, isValid: true });
      User.findOne.mockResolvedValueOnce(null);
      req.body = { username: "nonexistent", password: "password123" };

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ username: "User not found" });
    });

    it("should return 400 if password is incorrect", async () => {
      validateLogin.mockReturnValueOnce({ errors: {}, isValid: true });
      bcrypt.compare.mockResolvedValueOnce(false);
      User.findOne.mockResolvedValueOnce(global.mockUsers[0]);
      req.body = { username: "johndoe", password: "wrongpassword" };

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        password: "Invalid credentials",
      });
    });

    it("should login user and return 200", async () => {
      validateLogin.mockReturnValueOnce({ errors: {}, isValid: true });
      User.findOne.mockResolvedValueOnce(global.mockUsers[0]);
      req.body = { username: "johndoe", password: "password123" };

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "login successfully",
        user: {
          id: "1",
          fullName: "John Doe",
          username: "johndoe",
          gender: "male",
          profilePicture:
            "https://avatar.iran.liara.run/public/boy?username=johndoe",
        },
      });
    });
  });

  describe("logout", () => {
    it("should clear the token cookie and return 204", async () => {
      await logout(req, res);

      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.json).toHaveBeenCalledWith({
        message: "Logged out successfully",
      });
    });
  });
});
