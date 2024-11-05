import jwt from 'jsonwebtoken';
import { Server, Socket } from "socket.io";
import { PrismaClient, Role } from "@prisma/client";

const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET || "your_jwt_secret_key";
const ADMIN_ID = "2";
const connectedAdmins: Map<string, Socket> = new Map();
const connectedUsers: Map<string, Socket> = new Map();

export const socketHandler = async (socket: Socket, io: Server) => {
   console.log(`${socket.id} attempting to connect`);

   const authHeader = socket.handshake.headers.authorization;
   const token = authHeader && authHeader.split(' ')[1]; 

   if (!token) {
      console.log("Token not found, disconnecting socket");
      socket.disconnect();
      return;
   }

   try {
      const decoded = jwt.verify(token, SECRET_KEY) as { userId: number; role: Role };
      const { userId, role } = decoded;

      if (role === "ADMIN") {
         connectedAdmins.set(userId.toString(), socket);
         joinAdminToUserRooms(socket, io);
         console.log(`Admin ${userId} connected and joined user rooms`);
      } else if (role === "USER") {
         connectedUsers.set(userId.toString(), socket);
         joinUserRoom(socket, userId.toString());
         console.log(`User ${userId} joined room ${userId}${ADMIN_ID}`);
      } else {
         console.log("Unknown role, disconnecting socket");
         socket.disconnect();
      }

      socket.on("chat message", (data: { message: string; roomId: string }) => {
         io.to(data.roomId).emit("chat message", { 
            message: data.message, 
            senderId: userId, 
            timestamp: new Date().toISOString() 
         });
      });

      socket.on("disconnect", () => {
         console.log(`${socket.id} disconnected`);
         connectedAdmins.delete(userId.toString());
         connectedUsers.delete(userId.toString());
      });

   } catch (err) {
      console.log("Invalid token, disconnecting socket");
      socket.disconnect();
   }
};

function joinUserRoom(socket: Socket, userId: string) {
   const roomName = `${userId}${ADMIN_ID}`;
   socket.join(roomName);
   socket.emit("connected", { room: roomName });

   const adminSocket = connectedAdmins.get(ADMIN_ID);
   if (adminSocket) {
      adminSocket.join(roomName);
   }
}

function joinAdminToUserRooms(adminSocket: Socket, io: Server) {
   connectedUsers.forEach((userSocket, userId) => {
      const roomName = `${userId}${ADMIN_ID}`;
      adminSocket.join(roomName);
   });
   adminSocket.emit("connected", { rooms: Array.from(connectedUsers.keys()) });
}
