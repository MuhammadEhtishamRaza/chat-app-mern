import express from "express";
import protectRoute from "../middlewares/protectRoute.middleware.js";
import {
  getCurrentUserData,
  getOnlineUsers,
  getUsersByIds,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/me", protectRoute, getCurrentUserData);
router.get("/users", protectRoute, getOnlineUsers);
router.post("/users-by-ids", protectRoute, getUsersByIds);

export default router;
