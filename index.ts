import express, { Request, Response } from "express";
import router from "./src/router";
import dotenv from "dotenv";
import cors from "cors";
import { createServer } from "http";  
import { Server as HttpServer, IncomingMessage, ServerResponse } from "http";
import { Server as SocketIOServer } from "socket.io";
import { socketHandler } from "./src/socket/index"; 

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

// Error handling middleware
app.use((req: Request, res: Response) => {
   res.status(500).json({
      message: res.locals.errorMessage,
   });
});

// Create HTTP server
const httpServer = createServer(app);

export let io: SocketIOServer;

// Initialize and configure Socket.IO
export const ioServer = (server: HttpServer) => {
   io = new SocketIOServer(server, {
      cors: {
         origin: "*",  // Update this based on your needs, e.g., specific frontend URLs
         methods: ["GET", "POST"]
      }
   });
   
   io.on("connection", (socket) => {
      console.log(`New client connected: ${socket.id}`);
      socketHandler(socket, io);  // Attach your socketHandler to handle events
   });
};

// Call ioServer to initialize WebSocket on httpServer
ioServer(httpServer);

// Start the combined server
httpServer.listen(port, () => console.log(`Server is running on port ${port}`));
