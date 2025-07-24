import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId] || [];
};

const userSocketMap = {};

io.on("connection", (socket) => {
  console.log("a user connected, ", socket.id);
  const userId = socket.handshake.query.userId;
  if (userId && userId !== "undefined") {
    if (!userSocketMap[userId]) {
      userSocketMap[userId] = [];
    }
    userSocketMap[userId].push(socket.id);
  }

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // Change this
  socket.on("sendMessage", ({ receiverId, content }) => {
    console.log(`Message from ${userId} to ${receiverId}: ${content}`);
    const receiverSocketId = userSocketMap[receiverId];
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("receiveMessage", {
        senderId: userId,
        content,
      });
    }
    // Also emit to sender so they get instant feedback
    socket.emit("receiveMessage", {
      senderId: userId,
      content,
    });
  });
  
  // To this
  socket.on("sendMessage", ({ receiverId, content }) => {
    console.log(`Message from ${userId} to ${receiverId}: ${content}`);
    const receiverSocketIds = userSocketMap[receiverId];
    if (receiverSocketIds && receiverSocketIds.length > 0) {
      // Emit to all receiver's socket connections
      receiverSocketIds.forEach(socketId => {
        io.to(socketId).emit("receiveMessage", {
          senderId: userId,
          content,
        });
      });
    }
    // Don't emit to sender here as it causes duplicate messages
    // The message will be added to the UI when the HTTP request completes
  });

  socket.on("disconnect", () => {
    if (userId && userSocketMap[userId]) {
      userSocketMap[userId] = userSocketMap[userId].filter(
        (id) => id !== socket.id
      );
      if (userSocketMap[userId].length === 0) {
        delete userSocketMap[userId];
      }
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});
export { app, io, server };
