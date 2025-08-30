import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import { connectDB } from "./lib/db.js";
import userRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messagesRoutes.js";

// create express app http server
const app = express();
const server = http.createServer(app);

// initialize socket.io
export const io = new Server(server, { cors: { origin: "*" } });

// store online users
export const userSocketMap = {}; // { userId:socketId }

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;

  console.log("user connected", userId);

  if (userId) userSocketMap[userId] = socket.id;

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("user disconnected", userId);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

// middleware
app.use(express.json({ limit: "4mb" }));
app.use(cors());

// routes
app.use("/api/status", (req, res) => res.send("Server is live"));
app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter);

// connect to db
await connectDB();

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () => console.log(`server is running on port:${PORT}`));
}

// export for vercel
export default server;
