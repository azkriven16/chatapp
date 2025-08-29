import express from "express";
import {
  authenticated,
  login,
  signup,
  updateProfile,
} from "../controllers/userController.js";
import { protectRoute } from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.put("/update", protectRoute, updateProfile);
userRouter.get("/check", protectRoute, authenticated);

export default userRouter;
