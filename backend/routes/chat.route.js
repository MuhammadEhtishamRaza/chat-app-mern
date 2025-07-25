import express from "express";
import protectRoute from "../middlewares/protectRoute.middleware.js";
import { sendMessage, getMessages } from "../controllers/chat.controller.js";

const router = express.Router();

router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);

export default router;
