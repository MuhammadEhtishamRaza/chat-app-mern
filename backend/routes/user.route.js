import express from "express";
import protectRoute from "../middlewares/protectRoute.middleware";
import { getCurrentUser } from "../controllers/user.controller";

const router = express.Router();

router.get("/me", protectRoute, getCurrentUser);

export default router;
