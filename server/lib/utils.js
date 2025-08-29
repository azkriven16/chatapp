import jwt from "jsonwebtoken";

// generate token
export const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET);
};
