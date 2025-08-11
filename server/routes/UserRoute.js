import express from "express";
import {
  addWorkout,
  getUserDashboard,
  getWorkoutsByDate,
  UserRegister,
  UserSignIn,
} from "../controllers/UserController.js";
import { verifyToken } from "../middleware/VerifyToken.js";

export const router = express.Router();

router.post("/signup", UserRegister);
router.post("/signin", UserSignIn);

router.get("/dashboard", verifyToken, getUserDashboard);
router.get("/workout", verifyToken, getWorkoutsByDate);
router.post("/workout", verifyToken, addWorkout);
