import express from "express";
import http from "http";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    // credentials: true,
  },
});

const OnlineUsers = {};

io.use((socket, next) => {
  const token = socket.handshake.auth.token;

  if (!token) {
    return next(new Error("Authentication error: No token provided"));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.userId = decoded.userId;
    next();
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    next(new Error("Authentication error: Invalid token"));
  }
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("new-user-add", (newUserId) => {
    OnlineUsers[newUserId] = socket.id;
    console.log(`User ${newUserId} is now online with socket:`, socket.id);
    socket.userId = newUserId;
    const currentOnlineUsers = Object.keys(OnlineUsers);
    io.emit("online-users", currentOnlineUsers);
  });

  socket.on("send-message", (data) => {
    const { senderId, message, receiverId } = data;
    console.log("Sender ID:", senderId);
    console.log(
      "Sending message to socket:",
      socket.id,
      " the message is: ",
      message
    );
    console.log("Receiver ID:", receiverId);
    const receiverSocket = OnlineUsers[receiverId];
    console.log("Receiver socket:", receiverSocket);
    if (receiverSocket) {
      io.to(receiverSocket).emit("receive-message", {
        senderId,
        message,
        receiverId,
      });
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    const userId = socket.userId;
    if (userId && OnlineUsers[userId] === socket.id) {
      delete OnlineUsers[userId];
      console.log(`User ${userId} disconnected.`);

      // Emit updated online users list to all remaining clients
      const remainingOnlineUsers = Object.keys(OnlineUsers);
      io.emit("online-users", remainingOnlineUsers);
    }
  });
});

export { app, server, io };
