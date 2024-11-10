import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const TransactionRepository = {
  getAllTransactions: async () => {
    return await prisma.transaction.findMany({
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
        transactionItems: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  },
};
