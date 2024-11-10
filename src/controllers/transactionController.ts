import { Request, Response } from "express";
import * as paymentService from "../services/transactionService";

export const initiatePayment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const cartId = parseInt(req.params.cartId, 10);
    const transaction = await paymentService.initiatePayment(cartId);

    res
      .status(200)
      .json({ message: "Payment initiated successfully", transaction });
  } catch (error) {
    console.error("Error initiating payment:", error);
    res.status(500).json({ message: "Failed to initiate payment" });
  }
};

export const handleNotification = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const notification = req.body;

    // Process the notification from Midtrans
    await paymentService.processNotification(notification);

    res.status(200).json({ message: "Notification processed successfully" });
  } catch (error) {
    console.error("Error processing Midtrans notification:", error);
    res.status(500).json({ message: "Failed to process notification" });
  }
};

export const getTransactionStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const orderId = req.params.orderId;
    const status = await paymentService.checkTransactionStatus(orderId);

    res.status(200).json({ message: "Transaction status retrieved", status });
  } catch (error) {
    console.error("Error retrieving transaction status:", error);
    res.status(500).json({ message: "Failed to retrieve transaction status" });
  }
};
