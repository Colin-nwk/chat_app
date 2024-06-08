import { Server } from "socket.io";
import http from "http";
import express from "express";
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const userSocketMap = {}; //{userId: sockerId}

export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};
io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId !== undefined) userSocketMap[userId] = socket.id;

  // Send online users only when there's a change
  const sendOnlineUsers = () => {
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  };

  sendOnlineUsers(); // Send online users when a user connects

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
    if (userId !== undefined) delete userSocketMap[userId]; // Check userId existence before deleting
    sendOnlineUsers(); // Send updated online users list
  });
});

export { app, io, server };
