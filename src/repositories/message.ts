import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class MessageRepository {
  static async getMessagesByRoom(roomId: number) {
    return prisma.message.findMany({
      where: { roomId },
      include: { sender: { select: { username: true } } },
      orderBy: { createdAt: "asc" },
    });
  }

  static async createMessage(
    content: string,
    senderId: number,
    roomId: number
  ) {
    return prisma.message.create({
      data: {
        content,
        senderId,
        roomId,
      },
      include: { sender: { select: { username: true } } },
    });
  }
}
