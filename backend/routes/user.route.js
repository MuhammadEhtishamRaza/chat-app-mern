import express from "express";
import protectRoute from "../middlewares/protectRoute.middleware.js";
import { getCurrentUser } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/me", protectRoute, getCurrentUser);

export default router;
