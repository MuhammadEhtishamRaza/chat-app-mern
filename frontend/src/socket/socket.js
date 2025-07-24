// socket.js
import { io } from "socket.io-client";

let socket = null;

export const connectSocket = (userId) => {
  if (!userId) {
    console.error("User ID is required to connect socket.");
    return;
  }

  socket = io("http://localhost:5000", {
    query: { userId },
    withCredentials: true,
    transports: ["websocket"],
  });

  socket.on("connect", () => {
    console.log("Socket connected:", socket.id);
  });

  socket.on("connect_error", (err) => {
    console.error("Socket connection error:", err);
  });

  socket.on("disconnect", (reason) => {
    console.warn("Socket disconnected:", reason);
  });

  socket.on("receiveMessage", (data) => {
    console.log("New message:", data);
  });

  socket.on("getOnlineUsers", (onlineUsers) => {
    console.log("Online users:", onlineUsers);
  });

  return socket;
};

export const getSocket = () => socket;
