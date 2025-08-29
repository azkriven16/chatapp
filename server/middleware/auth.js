import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

// protect routes
export const protectRoute = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "JWT must be provided",
      });
    }

    const token = authHeader.split(" ")[1]; // extract token after "Bearer "

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
