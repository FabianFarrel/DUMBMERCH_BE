import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const TransactionRepository = {
  getAllTransactions: async () => {
    return await prisma.transactions.findMany({
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
        cart: {
          include: {
            cartItems: {
              include: {
                product: {
                  select: {
                    productName: true,
                    price: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  },
};
