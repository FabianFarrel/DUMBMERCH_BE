import { prisma } from "../libs/prisma";

export const getOrCreateRoom = async (userId: number, adminId: number) => {
  try {
    console.log("Searching for existing room...");
    const room = await prisma.room.findFirst({
      where: {
        AND: [
          { users: { some: { id: userId } } },
          { users: { some: { id: adminId } } },
        ],
      },
      include: {
        users: {
          select: {
            role: true, // Make sure to include role
            profile: {
              select: {
                id: true,
                fullname: true,
                address: true,
                gender: true,
                phone: true,
                image: true,
              },
            },
          },
        },
        messages: true,
      },
    });

    if (room) {
      // Merge role into profile for each user
      room.users = room.users.map((user) => ({
        role: user.role,
        profile: user.profile,
      }));

      console.log("Room found:", room);
      return room;
    }

    console.log("Room not found, creating a new one...");
    const newRoom = await prisma.room.create({
      data: {
        users: {
          connect: [{ id: userId }, { id: adminId }],
        },
      },
      include: {
        users: {
          select: {
            role: true, // Include role
            profile: {
              select: {
                id: true,
                fullname: true,
                address: true,
                gender: true,
                phone: true,
                image: true,
              },
            },
          },
        },
        messages: true,
      },
    });

    // Merge role into profile for each user
    newRoom.users = newRoom.users.map((user) => ({
      role: user.role,
      profile: user.profile,
    }));

    console.log("Room created:", newRoom);
    return newRoom;
  } catch (error) {
    console.error("Error in getOrCreateRoom:", error);
    throw error;
  }
};

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
    },
  });
  return messages;
};
