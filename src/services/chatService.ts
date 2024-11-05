import { prisma } from "../libs/prisma";

export const sendMessage = async (
  userId: number,
  roomId: number,
  content: string
) => {
  const messages = await prisma.message.create({
    data: {
      senderId: userId,
      roomId,
      content,
    },
  });
  return messages;
};

export const getMessage = async (roomId: number) => {
  const messages = await prisma.message.findMany({
    where: {
      roomId,
    },
    include: {
      sender: true,
    }
  });
  return messages;
};