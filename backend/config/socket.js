import express from "express";
import http from "http";
import { Server } from "socket.io";
// import cors from "cors";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Your frontend URL
    // credentials: true,
  }
});

// app.use(cors({
//   origin: "http://localhost:5173",
//   credentials: true,
// }));
const OnlineUsers = {};

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("new-user-add", (newUserId) => {
    OnlineUsers[newUserId] = socket.id;
    console.log(`User ${newUserId} is now online with socket:`, socket.id);
    // Attach userId to socket for disconnect cleanup
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

// server.listen(3000, () => {
//   console.log("Server listening on http://localhost:3000");
// });

export { app, server, io };