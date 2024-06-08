// __tests__/setup.js
import User from "../models/user.model.js";

// Mock the User model
jest.mock("../models/user.model", () => {
  return jest.fn().mockImplementation(() => ({
    save: jest.fn(),
    findOne: jest.fn(),
  }));
});

// Create some mock user data
global.mockUsers = [
  {
    _id: "1",
    fullName: "John Doe",
    username: "johndoe",
    password: "$2a$10$...", // Hashed password
    gender: "male",
    profilePicture: "https://avatar.iran.liara.run/public/boy?username=johndoe",
  },
  {
    _id: "2",
    fullName: "Jane Smith",
    username: "janesmith",
    password: "$2a$10$...", // Hashed password
    gender: "female",
    profilePicture:
      "https://avatar.iran.liara.run/public/girl?username=janesmith",
  },
];
