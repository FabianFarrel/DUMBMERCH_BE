import { prisma } from "../libs/prisma";
import midtrans from "../libs/midtrans";
import * as cartRepo from "../repositories/cart";
import { TransactionStatus } from "@prisma/client";

export async function createTransaction(cartId: number) {
  let transactionRecord = null;
  try {
    // Fetch all items in the cart
    const cart = await cartRepo.getCartItems(cartId);
    if (!cart || cart.cartItems.length === 0) {
      throw new Error("Cart is empty or not found.");
    }

    // Calculate the total amount and prepare item details
    const totalAmount = cart.cartItems.reduce(
      (sum, item) => sum + item.product.price * item.qty,
      0
    );

    const itemDetails = cart.cartItems.map((item) => ({
      id: item.product.id.toString(),
      price: item.product.price,
      quantity: item.qty,
      name: item.product.productName,
    }));

    // Create a new transaction record without orderId
    transactionRecord = await prisma.transaction.create({
      data: {
        amount: totalAmount,
        status: "PENDING",
        userId: cart.userId,
        cartId: cartId,
        transactionItems: {
          create: cart.cartItems.map((item) => ({
            productId: item.productId,
            quantity: item.qty,
            productPrice: item.product.price,
            totalPrice: item.product.price * item.qty,
          })),
        },
      },
    });

    // Generate the orderId and update the transaction
    const orderId = `order-${transactionRecord.id}-${Date.now()}`;
    await prisma.transaction.update({
      where: { id: transactionRecord.id },
      data: { orderId },
    });

    // Create transaction in Midtrans
    const midtransTransaction = await midtrans.createTransaction({
      transaction_details: {
        order_id: orderId,
        gross_amount: totalAmount,
      },
      item_details: itemDetails,
      callbacks: {
        finish: "http://localhost:5000/finish",
      },
    });

    await prisma.cartItem.deleteMany({ where: { cartId: cartId } });

    const newCart = await cartRepo.createCart({ userId: cart.userId });

    return {
      orderId,
      transaction: midtransTransaction,
      redirectUrl: midtransTransaction.redirect_url,
      newCartId: newCart.id,
    };
  } catch (error) {
    console.error("Transaction creation error:", error);
    if (transactionRecord) {
      await prisma.transaction.delete({ where: { id: transactionRecord.id } });
    }
    throw new Error(
      `Failed to create transaction: ${(error as Error).message}`
    );
  }
}

export async function findTransactionByOrderId(orderId: string) {
  if (!orderId) {
    throw new Error("orderId is required to find a transaction.");
  }

  return prisma.transaction.findUnique({
    where: {
      orderId: orderId,
    },
  });
}

export async function updateTransactionStatus(
  transactionId: number,
  status: TransactionStatus
) {
  return prisma.transaction.update({
    where: { id: transactionId },
    data: { status },
  });
}

import axios from "axios"; // Add axios for HTTP requests

export async function getTransactionStatus(orderId: string) {
  try {
    const midtransApiUrl = `https://api.sandbox.midtrans.com/v2/${orderId}/status`;

    // Send GET request to Midtrans API for status
    const response = await axios.get(midtransApiUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(
          process.env.MT_SERVER_KEY + ":"
        ).toString("base64")}`,
      },
    });

    const status = response.data.transaction_status;

    // Determine local status
    let newStatus: TransactionStatus = TransactionStatus.PENDING;
    if (status === "settlement") {
      newStatus = TransactionStatus.PAID;
    } else if (status === "cancel" || status === "expire") {
      newStatus = TransactionStatus.FAILED;
    }

    // Find and update the transaction in the database
    const transaction = await prisma.transaction.findUnique({
      where: { orderId },
    });

    if (transaction && transaction.status !== newStatus) {
      await prisma.transaction.update({
        where: { orderId },
        data: { status: newStatus },
      });
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching transaction status:", error);
    throw error;
  }
}
