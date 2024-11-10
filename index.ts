import express, { Request, Response } from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import { socketHandler } from "./src/socket";
import dotenv from "dotenv";
import * as chatService from "./src/services/chatService";
import router from "./src/router";
import cors from "cors";

dotenv.config();
const app = express();
const server = createServer(app);
app.use(cors());
const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);

io.on("connection", (socket) => {
  console.log(socket.id + " connected");

  socket.on("join room", (roomId) => {
    socket.join(roomId);
    console.log(`Socket ${socket.id} joined room ${roomId}`);

    socket.to(roomId).emit("user joined", socket.id);
  });

  socket.on("chat message", async (data) => {
    const { userId, roomId, content } = data;

    try {
      const savedMessage = await chatService.sendMessage(
        userId,
        roomId,
        content
      );

      io.to(roomId).emit("chat message", savedMessage);
    } catch (error) {
      console.log("Error sending message:", error);
      socket.emit("error", { message: "Failed to send message" });
    }
  });

  socket.on("disconnect", () => {
    console.log(socket.id + " disconnected");
  });
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
