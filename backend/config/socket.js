import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

const OnlineUsers = {};

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("new-user-add", (newUserId) => {
    OnlineUsers[newUserId] = socket.id;
    console.log(`User ${newUserId} is now online with socket:`, socket.id);
    socket.userId = newUserId;
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    const userId = socket.userId;
    if (userId && OnlineUsers[userId] === socket.id) {
      delete OnlineUsers[userId];
      console.log(`User ${userId} disconnected.`);
    }
  });
});

export { app, server, io };
