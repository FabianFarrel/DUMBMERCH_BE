import * as paymentRepository from "../repositories/transaction";
import * as cartRepository from "../repositories/cart";
import { TransactionStatus } from "@prisma/client";
import { prisma } from "../libs/prisma";
import cron from "node-cron";

export async function initiatePayment(cartId: number) {
  try {
    const cart = await cartRepository.getCartItems(cartId);

    if (!cart || !cart.cartItems || cart.cartItems.length === 0) {
      throw new Error("No items in cart or cart not found.");
    }

    const transaction = await paymentRepository.createTransaction(cartId);

    return {
      orderId: transaction.orderId,
      redirectUrl: transaction.transaction.redirect_url,
    };
  } catch (error) {
    console.error("Payment initiation error:", error);
    throw new Error((error as Error).message);
  }
}

export async function processNotification(notification: any) {
  try {
    console.log("Received notification:", notification);

    const transactionStatus = notification.transaction_status;
    const orderId = notification.order_id;

    if (!transactionStatus || !orderId) {
      throw new Error(
        "transaction_status or order_id is missing in the notification."
      );
    }
    if (!orderId) {
      throw new Error("orderId is missing in the notification.");
    }

    const transaction = await paymentRepository.findTransactionByOrderId(
      orderId
    );

    if (!transaction) {
      throw new Error("Transaction not found.");
    }

    let statusToUpdate: TransactionStatus = TransactionStatus.PENDING;
    if (transactionStatus === "settlement") {
      statusToUpdate = TransactionStatus.PAID;
    } else if (
      transactionStatus === "cancel" ||
      transactionStatus === "expire"
    ) {
      statusToUpdate = TransactionStatus.FAILED;
    }

    await paymentRepository.updateTransactionStatus(
      transaction.id,
      statusToUpdate
    );
  } catch (error) {
    console.error("Error processing notification:", error);
    throw error;
  }
}

export async function checkTransactionStatus(orderId: any) {
  try {
    const status = await paymentRepository.getTransactionStatus(orderId);
    return status;
  } catch (error) {
    console.error("Error checking transaction status:", error);
    throw new Error("Failed to check transaction status");
  }
}

cron.schedule("*/30 * * * * *", async () => {
  try {
    console.log("Checking pending transactions...");
    const pendingTransactions = await prisma.transaction.findMany({
      where: { status: "PENDING" },
    });

    for (const transaction of pendingTransactions) {
      if (transaction.orderId) {
        await paymentRepository.getTransactionStatus(transaction.orderId);
      } else {
        console.error(`Transaction without orderId: ${transaction}`);
      }
    }
  } catch (error) {
    console.error("Error during scheduled transaction status check:", error);
  }
});
