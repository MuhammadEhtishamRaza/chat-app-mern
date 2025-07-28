import express from "express";
import protectRoute from "../middlewares/protectRoute.middleware.js";
import {
  getCurrentUserData,
  getOnlineUsers,
  getUsersByIds,
  profileUpdate,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/me", protectRoute, getCurrentUserData);
router.get("/users", protectRoute, getOnlineUsers);
router.post("/users-by-ids", protectRoute, getUsersByIds);
router.post("/profile/:id", protectRoute, profileUpdate);

export default router;
